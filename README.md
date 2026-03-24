# SeaSee'r — Underwater Mapping and Exploration Viewer

A panoramic image viewer built with THREE.js and React, allowing users to explore 360° equirectangular panoramas with mouse-drag navigation.

## Project Structure
```
seaseer/
├── .github/workflows/
│   └── ci.yml                        # GitHub Actions CI
├── public/panoramas/                 # Panorama images
├── src/
│   ├── constants/
│   │   └── panoramas.ts              # Panorama metadata
│   ├── hooks/
│   │   └── usePanoramaControls.ts    # Mouse drag controls
│   ├── App.tsx                       # Root component
│   ├── main.tsx                      # Entry point
│   ├── PanoramaNav.tsx               # Navigation buttons
│   ├── PanoramaViewer.tsx            # THREE.js viewer
│   └── index.css                     # Global styles
├── tests/e2e/
│   ├── screenshots/                  # Generated test artifacts
│   └── panorama.test.js              # Puppeteer + Vitest E2E tests
└── vite.config.ts
```

## Tech Stack

- React + TypeScript
- THREE.js — inverse sphere with BackSide rendering
- Vite
- Puppeteer + Vitest — E2E testing

## Getting Started

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```

### Run E2E tests (requires dev server running)
```bash
npm run test:e2e
```

### Run CI tests (builds and serves automatically)
```bash
npm run test:ci
```
## How It Works

- A `SphereGeometry` is rendered with `THREE.BackSide` so the inner face is visible
- The camera is placed at the center `(0, 0, 0)` of the sphere
- Equirectangular panorama images are applied as textures via `TextureLoader`
- Mouse drag updates a `Spherical` coordinate which is converted to a `camera.lookAt` target
- Navigation buttons swap the texture on the existing material without reinitialising THREE.js

## CI

GitHub Actions runs on every push to `main`:
1. Installs dependencies
2. Builds the project
3. Starts the preview server
4. Runs E2E tests
5. Uploads screenshots as artifacts

## AI Review

TBD