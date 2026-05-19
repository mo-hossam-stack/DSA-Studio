# DSA Studio

> An interactive data structures and algorithms visualizer built to make core CS concepts easier to understand through animation, code, and step-by-step explanation.

[![Live Demo](https://img.shields.io/badge/Live-Demo-0ea5e9?style=for-the-badge&logo=netlify&logoColor=white)](https://dsa-studio.netlify.app)
[![React](https://img.shields.io/badge/React-18-20232a?style=for-the-badge&logo=react&logoColor=61dafb)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-0f172a?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8)](https://tailwindcss.com/)

## Overview

DSA Studio is an educational web app that visualizes classic sorting and searching algorithms in a clean, responsive interface. Instead of only showing the final result, it breaks each algorithm into snapshots so users can follow how the array changes, which values are being compared, and which line of code is currently active.

This project was built to demonstrate more than UI work. It shows practical reusable stateful logic, metadata-driven routing, algorithm step generation, responsive interaction design, deployment readiness, and user-focused product thinking.

## Why This Project Stands Out

- Turns abstract algorithms into an interactive learning experience.
- Combines animation, textual explanation, complexity analysis, and code tracing in one screen.
- Uses reusable visualization state management instead of hardcoding playback logic per algorithm.
- Supports multiple algorithm categories through a shared metadata-driven structure.
- Includes production-minded deployment setup with Netlify, Docker, and Nginx.
- Presents a polished dark/light UI with responsive behavior across desktop and mobile.

## Core Features

- Step-by-step visualization for sorting and searching algorithms.
- Manual playback controls with previous, next, reset, and auto-play.
- Adjustable playback speed for slower learning or faster review.
- Custom array input with validation for size and value range.
- Random dataset generation for quick demos.
- Search target input for searching algorithms.
- Dynamic explanation panel describing what happens at each step.
- Code panel with three views: pseudocode, standard C++, and a compact alternative C++ version.
- Active code-line highlighting during visualization.
- Algorithm information cards covering complexity, stability, and best-use cases.
- Responsive navigation with desktop tabs and a mobile selector.
- Persistent dark mode using `localStorage`.
- Automatic sorting notice for binary search when the provided array is not sorted.


## Recruiter Notes

This project highlights the ability to:

- Design a product with a clear educational use case.
- Build reusable React components around a shared interaction model.
- Separate algorithm content from rendering through metadata and step generators.
- Translate algorithm logic into visual state snapshots suitable for UI playback.
- Ship a responsive SPA with clean routing, theming, and deployable infrastructure.
- Balance technical depth with accessible UX for non-expert users.

## Architecture Highlights

### 1. Metadata-Driven Algorithm Catalog

All algorithm content is centralized in `frontend/src/data/algorithmsMetadata.js`.

This includes:

- Names and slugs
- Category type
- Descriptions
- Complexity data
- Stability and use-case notes
- Pseudocode
- Standard C++ implementation
- Alternate compact C++ implementation

This structure makes the app easier to scale because adding a new algorithm does not require rewriting the entire page layout.

### 2. Reusable Visualization Playback Logic

`frontend/src/hooks/useVisualizer.js` manages:

- Current step index
- Play and pause state
- Adjustable playback speed
- Step navigation
- Reset behavior
- Auto-stop at the final step

This keeps playback behavior isolated from presentation components.

### 3. Algorithm Step Generators

Each algorithm has a dedicated generator in `frontend/src/algorithms/` that returns a sequence of snapshots. Each snapshot can contain:

- The current array state
- Highlighted indices
- Human-readable explanation text
- The related code line

That snapshot-driven design is what powers the animation, explanation panel, and code-line highlighting together.

### 4. Single Page, Multi-Algorithm Navigation

The app uses route-based navigation such as:

- `/selection-sort`
- `/insertion-sort`
- `/merge-sort`
- `/quick-sort`
- `/linear-search`
- `/binary-search`

The root route redirects to `/insertion-sort`.

## User Experience Details

- Empty states guide users before visualization starts.
- Input validation prevents arrays that are too large for clear visual rendering.
- The UI remains usable on both desktop and mobile.
- Theme preference is remembered between sessions.
- Progress indicators make long visualizations easier to follow.


## Local Development

### Prerequisites

- Node.js 20+ recommended
- npm

### Run Locally

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build

```bash
cd frontend
npm run build
npm run preview
```

## Docker

Run the app in a container from the repository root:

```bash
docker compose up --build
```

Then open `http://localhost:3000`.

The Docker setup builds the Vite app and serves the static output through Nginx.


## Contributors

- Mohamed Hossam: https://mohossam.netlify.app/
- Marwan Islam: https://www.linkedin.com/in/mrwan-islam-77ba27380/
