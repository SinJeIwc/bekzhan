# Repository Guidelines

## Project Structure & Module Organization
- `client/` holds the Next.js app (App Router) and all source code.
- `client/src/app/` contains the entry layout, global styles, and route pages.
- `client/src/components/` houses UI and feature components (see `ui/` and `navigation/`).
- `client/src/lib/` includes shared utilities and hooks.
- `client/src/constants/` stores static configuration such as navigation data.
- `client/public/` contains static assets (SVGs, icons).
- Root assets like `original-129d36034dfb97829750a25e025e1633.mp4` are repository-level media.

## Build, Test, and Development Commands
Run these from `client/`:
- `pnpm dev`: start the local dev server at `http://localhost:3000`.
- `pnpm build`: create a production build.
- `pnpm start`: run the production server from the build output.
- `pnpm lint`: run Biome checks (formatting + lint rules).
- `pnpm format`: apply Biome formatting fixes.

## Coding Style & Naming Conventions
- Use 2-space indentation (Biome enforces this).
- Prefer TypeScript and React idioms already in use (App Router, functional components).
- Keep component files in `client/src/components/` and use kebab-case filenames (e.g., `theme-button.tsx`).
- Update styles in `client/src/app/globals.css` and Tailwind utility classes in JSX.

## Testing Guidelines
- No automated tests are configured yet.
- If adding tests, document the framework and add scripts in `client/package.json`.
- Name test files with a clear suffix (e.g., `*.test.tsx`) and place them alongside the component or in a `__tests__/` folder.

## Commit & Pull Request Guidelines
- Git history is minimal (`Initial commit` only), so no established commit message convention exists.
- Keep commits focused and descriptive (e.g., `Add hero animation`).
- PRs should include: a short summary, linked issue (if any), and screenshots or clips for UI changes.

## Configuration Tips
- Project uses Biome for linting/formatting (`client/biome.json`).
- Next.js config lives in `client/next.config.ts`; change with care for build behavior.
