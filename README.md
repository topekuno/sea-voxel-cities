# SEA Voxel Cities

Interactive 3D voxel-art tour of Malaysian and Southeast Asian cities — built with **Vite**, **React**, **TypeScript**, and **Three.js** (`@react-three/fiber` + `@react-three/drei`).

Cycle through seven handcrafted procedural cityscapes: Kuala Lumpur, George Town (Penang), Singapore, Bangkok, Jakarta, Ho Chi Minh City, and Manila. Each scene has its own color palette, sky gradient, and landmark voxels (Petronas Towers, heritage shophouses, Marina Bay Sands–style towers, temple spires, and more).

## Quick start

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build

```bash
npm run build
```

Preview the production build with `npm run preview`.

## Controls

- **Prev / Next** buttons (large touch targets)
- **← / →** arrow keys
- Progress dots jump to a city
- Soft fade between scenes; gentle camera sway on each skyline

## Stack

- Vite + React 19 + TypeScript
- three / @react-three/fiber / @react-three/drei
- Procedural voxels via `InstancedMesh` grouped by color

## Project layout

```
src/
  App.tsx                 # City index + fade navigation
  cities/                 # Data, palettes, generators
  components/
    VoxelCity.tsx         # R3F canvas + lights + sky
    VoxelInstances.tsx    # InstancedMesh voxels
    UI.tsx                # Overlay chrome
    CameraSway.tsx
    SkyBackdrop.tsx
```
