import { useEffect, useState } from 'react';

const getCategory = (width) => {
    if (width < 640) return 'mobile';
    if (width < 1024) return 'tablet';
    if (width < 1440) return 'laptop';
    return 'desktop';
};

/**
 * Live viewport state: size, device category and orientation.
 * Updates on resize and orientation change so the 3D scene and UI
 * can react when the user rotates a phone or resizes a window.
 */
const useViewport = () => {
    const [viewport, setViewport] = useState(() => {
        if (typeof window === 'undefined') {
            return { width: 1280, height: 800, category: 'laptop', isPortrait: false, isSmall: false };
        }
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            category: getCategory(window.innerWidth),
            isPortrait: window.innerHeight > window.innerWidth,
            isSmall: window.innerWidth < 768
        };
    });

    useEffect(() => {
        let frame = 0;
        const update = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                setViewport({
                    width: window.innerWidth,
                    height: window.innerHeight,
                    category: getCategory(window.innerWidth),
                    isPortrait: window.innerHeight > window.innerWidth,
                    isSmall: window.innerWidth < 768
                });
            });
        };

        window.addEventListener('resize', update);
        window.addEventListener('orientationchange', update);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('resize', update);
            window.removeEventListener('orientationchange', update);
        };
    }, []);

    return viewport;
};

// Camera tuning per device category: wider FOV on small screens so the
// corridor and rooms stay fully framed; narrower on large desktops.
export const CAMERA_BY_CATEGORY = {
    mobile: { fov: 72, z: 26 },
    tablet: { fov: 68, z: 27 },
    laptop: { fov: 60, z: 28 },
    desktop: { fov: 55, z: 28 }
};

export const getCameraFov = (category, isPortrait) => {
    const base = CAMERA_BY_CATEGORY[category] || CAMERA_BY_CATEGORY.laptop;
    return isPortrait && category === 'mobile' ? Math.min(base.fov + 6, 80) : base.fov;
};

export default useViewport;
