
# Social Media Dashboard (JSONPlaceholder SPA)

A production-minded Single Page Application using **React + Vite + TypeScript** that consumes **JSONPlaceholder** API.
Implements browsing & CRUD per the assessment:

- View list of **users**
- View **posts** and **albums** per user
- View **post detail** + **comments**
- View **photos** in an album
- View **photo detail**
- **CRUD posts** (add, edit, delete) — optimistic UI
- **CRUD comments** (add, edit, delete) — optimistic UI

## Tech
- React 18, React Router 6, TypeScript
- Vite build tool
- Vitest + Testing Library (unit tests)
- Fetch API (no extra client dependency)

## Run Locally (≤ 5 steps)
1. Clone this repo and `cd` into it
2. Install deps: `npm install`
3. Dev server: `npm run dev` (open the printed URL)
4. Run tests (optional): `npm run test`
5. Build & preview (optional): `npm run build && npm run preview`

> **Note**: First commit should only contain framework init; next commits with meaningful messages (feature, fix, test). When pushing to your public repo, **do not** use names containing company keywords.

## Structure
```text
src/
  api/               // API layer (fetch wrappers)
  pages/             // Route pages
  components/        // Reusable components
  types.ts           // Shared TypeScript types
  App.tsx            // Layout + routes outlet
  main.tsx           // Router bootstrap
  styles.css         // Simple dark theme
```

## Design & Assumptions
- JSONPlaceholder does not persist writes; app uses **optimistic UI** and keeps changes local.
- Minimal, sensible UI; keyboard- and screen-reader-friendly labels.
- Error/Loading states handled at page level.
- Abstraction layer: all network logic is centralized in `src/api/jsonplaceholder.ts`.

## Testing
- `src/api/jsonplaceholder.test.ts`: unit tests for API layer with mocked `fetch`
- `src/pages/UsersPage.test.tsx`: renders a page with mocked API
- `src/App.test.tsx`: smoke test for layout

## Deployment
Any static host (Vercel/Netlify) or Node host will work:
- `npm run build` (outputs `dist/`)
- Serve `dist/` or run `npm run preview`

## Accessibility
- Semantic HTML, proper `role` and `aria-live` for async states.
- Focus-visible preserved by default.

## Next improvements (nice-to-have)
- Global query caching (TanStack Query) & invalidations
- Pagination for posts/comments/photos
- E2E tests with Playwright
- Error boundary & retry buttons

## Created By Nobel In Warnet ( Bandung 14 Aug 2025 )
```
