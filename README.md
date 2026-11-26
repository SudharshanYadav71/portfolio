# Sudharshan Gorla — Interactive 3D Portfolio

An immersive 3D WebGL developer portfolio built with React 19, Three.js (React Three Fiber), GSAP and Vite 7. The site renders an infinite 3D corridor whose rooms — Gallery, Contact and About — are reached by walking through doors or via deep links that teleport the camera into the matching room.

The full application lives in [`sudharshan/`](sudharshan/).

## Highlights

- Interactive 3D environment with smooth camera transitions and animations
- Virtual routing: `/gallery`, `/about`, and `/contact` serve real pages and teleport the camera into the matching 3D room
- Adaptive device tiering: resolution, antialiasing and texture strictness scale with the device
- Asynchronous shader compilation and baked global tinting for stable performance
- Responsive for desktop and mobile, with hidden semantic SEO content for crawlers

## Tech Stack

- React 19 + Vite 7
- Three.js / React Three Fiber / drei
- GSAP
- JavaScript (ES modules), CSS3, WebGL

## Getting Started

```bash
cd sudharshan
npm install
npm run dev      # dev server with hot reload
npm run build    # production build
npm run preview  # serve the production build
```

Requires Node.js 20+. Enable hardware acceleration in your browser for the smoothest 60 FPS rendering.

## Pages & Routes

- `/` — landing: the infinite 3D corridor
- `/gallery` — 3D gallery room of projects
- `/about` — about room with bio and skills
- `/contact` — contact room with message paper and social links

## Connect

- GitHub: [SudharshanYadav71](https://github.com/SudharshanYadav71)
- LinkedIn: [Sudharshan Gorla](https://www.linkedin.com/in/sudharshan-gorla-6556ba32b/)

---

<p align="center">
  Designed and developed with passion for technology, creativity, and innovation.
</p>
