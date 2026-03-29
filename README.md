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
│   ├── nav/
│   │   ├── PanoramaNav.tsx           # Navigation buttons
│   │   └── PanoramaNav.module.css    # Navigation styles                
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

## AI Review Summary

This project was AI-reviewed with Claude (claude.ai). Key changes made based on AI feedback:
### Bug Fixes
- Fixed panorama viewer always loading the first panorama on mount regardless of selected index
- Fixed GPU memory leak where textures were never disposed on panorama switch
- Added window resize handler to keep renderer size and camera aspect ratio in sync

### Performance
- Replaced `useState` with `useRef` for camera instance, eliminating an unnecessary render cycle
- Moved `Vector3` allocation outside the mouse move handler, removing per-event object creation

### Refactoring
- Migrated `PanoramaNav` inline styles to a CSS module
- Moved `PanoramaNav` component and styles into a dedicated `src/nav/` folder
- Refactored `usePanoramaControls` to accept a `RefObject` instead of a direct camera value

### Tests
- Replaced hardcoded `setTimeout` waits with condition-based waits, making tests resolve as soon as the UI is ready
- Moved `page.goto` to `beforeAll` so the app loads once instead of on every test
- Replaced fragile `nth-child` selectors with `data-testid` attributes
- Added `aria-current` assertions so nav tests have a real pass/fail signal
- Reduced overall test suite runtime by ~10x