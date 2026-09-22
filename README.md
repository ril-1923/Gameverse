# GameVerse — Gaming Hub

A fully client-side gaming discovery and community platform built with React, TypeScript, Vite, React Router, and Bootstrap 5. No backend required — all data is mocked locally and user state (favorites, reviews, achievements, community posts, settings) persists in `localStorage`.

## Getting Started

```bash
npm install
npm run dev      # start local dev server
npm run build    # type-check (tsc -b) + production build to dist/
npm run preview  # preview the production build locally
```

`npm run build` runs with strict TypeScript and completes with no errors.

## Deploying to GitHub Pages

The app uses `HashRouter` (routes like `#/games`) and `base: './'` in `vite.config.ts`, so the built `dist/` folder can be served from **any** static path — including a GitHub Pages project page — without extra rewrite rules or a 404 fallback trick.

1. `npm run build`
2. Push the contents of `dist/` to your `gh-pages` branch (or use a GitHub Action / the `gh-pages` npm package), or point GitHub Pages at the `dist/` folder.
3. Visit `https://<username>.github.io/<repo>/` — all navigation, refreshes, and deep links work correctly because of the hash-based routing.

## Architecture

- **`src/types`** — Shared TypeScript interfaces (`Game`, `Review`, `Achievement`, `CommunityPost`, `Category`, `LeaderboardPlayer`, `UserProfile`, `AppSettings`, etc).
- **`src/data`** — Centralized mock data: 30 procedurally-detailed games (each with screenshots, system requirements, pricing, platforms), categories, leaderboards, community posts, achievements, and quiz questions. All game art comes from a reliable public placeholder image service (`picsum.photos`) seeded per-game for consistent, deterministic artwork, with graceful fallback styling (`SafeImage`) if an image ever fails to load.
- **`src/contexts`** — React Context providers for global state, each with a paired hook and `localStorage` persistence via a shared `useLocalStorage` hook: `FavoritesContext` (`useFavorites`), `UserContext` (`useUser`), `SettingsContext` (`useSettings` / `useTheme`), `AchievementsContext` (`useAchievements`), `NotificationsContext` (`useNotifications`), `CommunityContext` (`useCommunity`), `ReviewsContext` (`useReviews`). All are composed in `AppProviders`.
- **`src/components`** — Reusable, presentation-focused UI building blocks (`GameCard`, `GameGrid`, `Navbar`, `Footer`, `ReviewCard`, `LeaderboardTable`, `AchievementCard`, `CommunityPostCard`, `Modal`, `ToastContainer`, `SafeImage`, etc).
- **`src/pages`** — One component per route, including a `pages/play` sub-folder for the five mini games.
- **`src/layouts/MainLayout.tsx`** — Shared shell (navbar, footer, toast container, page-transition + scroll-reset on route change) wrapping every route via React Router's nested layout route.
- **`src/hooks`** — `useLocalStorage`, `usePageMeta` (per-page `<title>` / meta description).
- **`src/styles.css`** — The full dark-gaming visual system: CSS custom properties for theme/accent tokens, glassmorphism cards, neon gradients and glow effects, hover animations, and responsive breakpoints.

## Major Features

- **Home** — cinematic hero, trending games, categories, recently released, top-rated ranking, animated statistics.
- **Games** — live client-side filtering by genre, platform, rating, release year, plus sorting and "Load More" pagination.
- **Game Details** — hero banner, screenshot lightbox, trailer placeholder, system requirements, local review submission, similar games.
- **Categories** — 12 genre cards linking into pre-filtered game search.
- **Leaderboard** — Global / Weekly / Monthly / Friends tabs with a top-3 podium and the logged-in user inserted into the rankings.
- **Community** — category filtering, like/save, and new-post creation, all persisted locally.
- **Profile** — level/XP bar, stats, recent achievements, reviews, community activity, and favorites.
- **Favorites** — persisted list with sorting and an empty state.
- **Achievements** — 30 achievements with unlock tracking, progress bar, and All/Unlocked/Locked filtering.
- **Play** — five fully playable mini games: Tic Tac Toe, Snake, Rock Paper Scissors, Memory Match, and a gaming-trivia Quiz Challenge — each unlocking related achievements.
- **Search** — cross-entity search (games, categories, community posts) with recent-search history.
- **Settings** — theme, accent color, notification, and privacy preferences, all persisted.
- **404** — a themed "Game Over" page with a return-home action.

Everything is fully responsive (desktop/tablet/mobile), keyboard accessible, and respects `prefers-reduced-motion`.
