## Requirements

- Node.js 20.9 or newer
- npm
- Access to the Route Academy commerce API

## Getting started

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Create your local environment file by copying `.env.example` to `.env.local`.

   PowerShell:

   ```powershell
   Copy-Item .env.example .env.local
   ```

   macOS/Linux:

   ```bash
   cp .env.example .env.local
   ```

3. Set a unique value for `NEXTAUTH_SECRET` in `.env.local`. Generate one with:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXTAUTH_URL` | Base URL of this app. Use `http://localhost:3000` for local development. |
| `NEXTAUTH_SECRET` | Secret used by NextAuth to secure authentication tokens and sessions. Use a long, random value and keep it private. |
| `NEXT_PUBLIC_API_URL` | Route Academy API v1 base URL used for catalog and most commerce features. |
| `NEXT_PUBLIC_API_URL_V2` | Route Academy API v2 base URL used for cart operations. |
| `NEXT_PUBLIC_ENV` | Set to `development` locally and `production` for production deployments. |

Keep `.env.local` private. Do not commit real secrets or credentials. Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser and must not contain secrets.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run lint` | Run ESLint. |
| `npm run build` | Create an optimized production build. |
| `npm run start` | Serve the production build locally. Run `npm run build` first. |

## Main features

- Browse products, categories, subcategories, and brands.
- Search and filter the catalog.
- View product details, ratings, and reviews.
- Manage cart, wishlist, checkout, and orders.
- Register, sign in, reset a password, and manage profile settings and addresses.
- Responsive storefront pages built with Tailwind CSS and HeroUI.

## Tech stack

- Next.js 16 with the App Router and TypeScript
- React 19
- Tailwind CSS 4 and HeroUI
- NextAuth for authentication
- Redux Toolkit and React Redux for cart and wishlist state
- Route Academy commerce API

## Project layout

```text
src/
  app/          App Router pages and API route handlers
  components/   Reusable interface components
  context/      Application providers and shared contexts
  data/         Static storefront content
  lib/          Shared server-side helpers
  redux/        Store and feature slices
  services/     API service functions
  types/        TypeScript types
  utils/        Shared utilities
```"# front-end-final-project" 
