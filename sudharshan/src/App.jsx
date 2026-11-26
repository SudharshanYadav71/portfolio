import { useState, Suspense, useEffect, useCallback, useMemo, lazy } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Preload, useTexture, Text, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';

import Preloader from './components/dom/Preloader';
import PaperTransition from './components/dom/PaperTransition';
import { AudioProvider, useAudio } from './context/AudioManager';
import { initAudio } from './utils/audioManager';
import { PerformanceProvider, usePerformance } from './context/PerformanceContext';
import { SceneProvider, useScene } from './context/SceneContext';
import NavigationUI from './components/ui/NavigationUI';
import GlobalOverlay from './components/ui/GlobalOverlay';
import ScreenReaderOverlay from './components/ui/ScreenReaderOverlay';
import { useDocumentMeta } from './hooks/useDocumentMeta';
import useViewport, { CAMERA_BY_CATEGORY } from './hooks/useViewport';
import posthog from 'posthog-js';
import { loadSanityData } from './hooks/useSanityData';

// Initialize PostHog only when a key is configured.
const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
if (posthogKey) {
  posthog.init(posthogKey, {
    api_host: import.meta.env.VITE_POSTHOG_HOST,
    person_profiles: 'identified_only',
  });
}

// Lazy load the heavy 3D experience
const Experience = lazy(() => import('./components/canvas/Experience'));

import './styles/main.scss';

// --- CONDITIONAL ASSET PRELOADING ---
// On high-end devices, preloads everything for zero stutter.
// On mobile/low-end devices, only preloads core textures to prevent Out Of Memory crashes.
import { 
  ENTRANCE_TEXTURES, 
  CORRIDOR_TEXTURES, 
  UI_TEXTURES,
  PRELOAD_ALL, 
  PRELOAD_LOADER,
  ABOUT_TEXTURES,
  IMAGE_ASSETS,
  filterTexturesByDevice
} from './config/texturePreloadList';
import { TextureLoader } from 'three';

// Standard Browser-level Image Preloader (for <img> tags)
const preloadBrowserImage = (path) => {
  if (typeof window === 'undefined' || !path) return;
  const img = new Image();
  img.src = path;
};

const scheduleProgressivePreload = (paths, batchSize = 6, intervalMs = 25) => {
  if (!Array.isArray(paths) || paths.length === 0) return;

  const queue = [...new Set(paths)];

  const runBatch = () => {
    const batch = queue.splice(0, batchSize);
    batch.forEach((path) => preloadBrowserImage(path));

    if (queue.length > 0) {
      const next = window.requestIdleCallback
        ? () => window.requestIdleCallback(runBatch)
        : () => setTimeout(runBatch, intervalMs);

      next();
    }
  };

  if (window.requestIdleCallback) {
    window.requestIdleCallback(runBatch);
  } else {
    setTimeout(runBatch, intervalMs);
  }
};

const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent || '');
const isWeakCPU = typeof navigator.hardwareConcurrency !== 'undefined' && navigator.hardwareConcurrency <= 4;
const isLowRAM = typeof navigator.deviceMemory !== 'undefined' && navigator.deviceMemory <= 4;
const isLowEnd = isMobileDevice || isWeakCPU || isLowRAM || (typeof window !== 'undefined' && window.innerWidth < 450);

// Refined check for "hover capability" (non-touch devices should have hover: hover)
// Laptops with touch screens (which also have a mouse/trackpad) will return true here.
const supportsHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

// Trigger Three.js preloads at module level (as standard for Drei)
const preloadThreeTextures = (paths, mode = 'useTexture') => {
  if (!Array.isArray(paths) || paths.length === 0) return;

  const queue = [...new Set(paths)];
  const processChunk = () => {
    const chunk = queue.splice(0, 4);
    chunk.forEach((path) => {
      if (mode === 'loader') useLoader.preload(TextureLoader, path);
      else useTexture.preload(path);
    });

    if (queue.length > 0) {
      const next = window.requestIdleCallback ? () => window.requestIdleCallback(processChunk) : () => setTimeout(processChunk, 50);
      next();
    }
  };

  if (typeof window !== 'undefined') {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(processChunk);
    } else {
      setTimeout(processChunk, 50);
    }
  }
};

if (isLowEnd) {
  const CORE_TEXTURES = [...ENTRANCE_TEXTURES, ...CORRIDOR_TEXTURES, ...UI_TEXTURES, ...IMAGE_ASSETS];
  const filteredCore = filterTexturesByDevice(CORE_TEXTURES, supportsHover);
  const filteredAbout = filterTexturesByDevice(ABOUT_TEXTURES, supportsHover);

  preloadThreeTextures(filteredCore);
  preloadThreeTextures(filteredAbout, 'loader');
} else {
  const filteredAll = filterTexturesByDevice(PRELOAD_ALL, supportsHover);
  const filteredLoader = filterTexturesByDevice(PRELOAD_LOADER, supportsHover);

  preloadThreeTextures(filteredAll);
  preloadThreeTextures(filteredLoader, 'loader');
}

const FONT_URL = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff';

// Helper component to handle global audio enable on interaction
const GlobalAudioEnabler = () => {
  const { enableAudio } = useAudio();
  useEffect(() => {
    const handleInteraction = () => enableAudio();
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [enableAudio]);
  return null;
};

// Scene background using corridor wall texture (static, no animation)
const PaperSceneBackground = () => {
  const texture = useTexture('/textures/paper-texture.webp');
  const backgroundTexture = useMemo(() => {
    const nextTexture = texture.clone();
    nextTexture.colorSpace = THREE.SRGBColorSpace;
    return nextTexture;
  }, [texture]);

  return <primitive object={backgroundTexture} attach="background" />;
};

// Bridge component to use hooks inside SceneProvider
// Handles dynamic meta tags + deep link auto-teleport
function DocumentMetaBridge() {
  useDocumentMeta();

  const { initialRoom, deeplinkHandled, markDeepLinkHandled, hasEntered, teleportTo } = useScene();

  // Deep linking: if user lands on e.g. /gallery, auto-teleport after scene loads
  useEffect(() => {
    if (initialRoom && hasEntered && !deeplinkHandled) {
      markDeepLinkHandled();
      // Small delay to let the corridor render first
      setTimeout(() => teleportTo(initialRoom), 300);
    }
  }, [initialRoom, hasEntered, deeplinkHandled, markDeepLinkHandled, teleportTo]);

  return null;
}

// Camera framing for the current device (fov, aspect) is applied inside
// useInfiniteCamera so it survives resize and phone rotation.
function AppContent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  // Live viewport state (reacts to resize / orientation change)
  const { category } = useViewport();
  const cameraPreset = CAMERA_BY_CATEGORY[category];

  // Use Performance Context
  const { settings, downgradeTier, tier } = usePerformance();

  // Force initialize audio in the background on mount
  useEffect(() => {
    initAudio();
  }, []);

  const handleSceneReady = useCallback(() => {
    requestAnimationFrame(() => {
      setSceneReady(true);
    });
  }, []);

  return (
    <AudioProvider>
      <SceneProvider>
        <DocumentMetaBridge />
        <GlobalAudioEnabler />
        <div className="app">
          {/* Full screen 3D Canvas */}
          <div className="canvas-wrapper">
            <Canvas
              camera={{
                position: [0, 0.2, cameraPreset.z],
                fov: cameraPreset.fov,
                near: 0.1,
                far: 150
              }}
              gl={{
                antialias: settings.antialias,
                alpha: false,
                powerPreference: settings.powerPreference,
                localClippingEnabled: true,
                failIfMajorPerformanceCaveat: true,
                preserveDrawingBuffer: false
              }}
              dpr={settings.dpr}
              shadows={settings.shadows}
            >
              <color attach="background" args={['#fafafa']} />
              <fog attach="fog" args={['#fafafa', 15, 50]} />

              {/* Scale performance down if fps drops */}
              <PerformanceMonitor
                onDecline={() => downgradeTier()}
                flipflops={3}
                onFallback={() => downgradeTier()}
              />

              {/* Advanced FPS & Performance Monitor */}
              {/* <Perf position="top-left" minimal={false} /> */}

              <Suspense fallback={null}>
                <Experience
                  isLoaded={isLoaded}
                  onSceneReady={handleSceneReady}
                  performanceTier={tier}
                />
                <Preload all />
              </Suspense>
            </Canvas>
          </div>

          {/* Navigation UI - Hamburger, Map, Back, Audio */}
          {isLoaded && (
            <>
              <NavigationUI />
              <GlobalOverlay />
              <PaperTransition />
              <ScreenReaderOverlay />
            </>
          )}

          {/* 2D Preloader */}
          <Preloader
            ready={sceneReady}
            onComplete={() => setIsLoaded(true)}
          />
        </div>
      </SceneProvider>
    </AudioProvider>
  );
}

import { AchievementsProvider } from './context/AchievementsContext';

export default function App() {
  // Preload browser-based images (for standard <img> tags) immediately upon mounting App
  // This ensures they are in the network waterfall during the initial loading phase.
  useEffect(() => {
    loadSanityData();

    const filteredImages = filterTexturesByDevice(IMAGE_ASSETS, supportsHover);
    scheduleProgressivePreload(filteredImages, 8, 20);
  }, []);

  return (
    <PerformanceProvider>
      <AchievementsProvider>
        <AppContent />
      </AchievementsProvider>
    </PerformanceProvider>
  );
}
