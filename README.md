# Truth or Dare Arena

A professional-grade single-player Truth or Dare mini-game built with React + Vite, Tailwind CSS, and Framer Motion.

## Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- Context API + Hooks
- clsx
- Howler.js (lightweight SFX)

## Features

- Landing page with animated game intro
- Truth and Dare gameplay screen with animated controls
- Random spin/reveal state before each task
- No immediate task repetition with shuffle queue
- History tracking for recent tasks
- Gamification:
  - Points
  - Streak
  - Leveling
  - Progress bar
  - Achievement unlocks
- Optional confetti celebration for completed dares
- Dark mode toggle
- Responsive layout (mobile, tablet, desktop)
- Keyboard-accessible controls and ARIA labels

## Folder Structure

```text
truth-dare-game/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── components/
│   │   ├── AchievementList.jsx
│   │   ├── AnimatedBackground.jsx
│   │   ├── ConfettiBurst.jsx
│   │   ├── ControlButtons.jsx
│   │   ├── DareButton.jsx
│   │   ├── GameCard.jsx
│   │   ├── ProgressPanel.jsx
│   │   ├── TaskDisplay.jsx
│   │   ├── TaskHistory.jsx
│   │   └── TruthButton.jsx
│   ├── context/
│   │   └── GameContext.jsx
│   ├── data/
│   │   ├── dareChallenges.js
│   │   └── truthQuestions.js
│   ├── hooks/
│   │   ├── useGameSounds.js
│   │   └── useTaskGenerator.js
│   ├── pages/
│   │   ├── Game.jsx
│   │   └── Home.jsx
│   └── styles/
│       └── globals.css
└── .gitignore
```

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Then open the local Vite URL shown in terminal (usually `http://localhost:5173`).

## Build for Production

```bash
npm run build
npm run preview
```

## Deployment

### Vercel

1. Push project to GitHub.
2. Import repository in Vercel.
3. Framework preset: `Vite`.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.

### Netlify

1. Push project to GitHub.
2. Add new site from Git.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy.

### GitHub Pages

1. Ensure repo is on GitHub.
2. Install deps: `npm install`
3. Build + deploy: `npm run deploy:gh`
4. In GitHub repo settings, verify Pages source is set to `gh-pages` branch.

## Notes

- Task datasets are included internally with 100+ truths and 100+ dares.
- Sound effects currently use embedded lightweight SFX placeholders and can be swapped with real audio files in `src/hooks/useGameSounds.js`.
