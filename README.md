# Xoni Direct-Media Delivery Backend

Xoni is a React and Node.js project using an Express/tRPC backend. The backend adds a **permission-aware direct media-file delivery flow** to the existing thumbnail/title preview experience.

## What the backend does

The `download.prepare` tRPC procedure accepts a source only when it is an HTTPS URL pointing directly to a supported file such as `.mp4`, `.webm`, `.mp3`, or `.m4a`. It requires an explicit ownership/permission confirmation, verifies that the selected video/audio option matches the direct file type, and then returns the approved source URL for the browser to request directly.

## What the backend intentionally does not do

The backend does **not** scrape, extract, bypass, or download streams from YouTube, TikTok, or other social-video platforms. Those links remain preview-only in the interface. Connect an authorized direct file URL that you own or are permitted to distribute in order to use the delivery action.

## Run locally

Install dependencies with `pnpm install`, then run `pnpm dev`. The app starts with the integrated Node.js development server. Validate the project with `pnpm test`, `pnpm check`, and `pnpm build`.

## Deploy to Vercel

The repository includes `vercel.json` and `api/[...path].ts`. Vercel builds the Vite interface into `dist/public`, serves the static output, and routes backend calls under `/api/*` through the Node.js Express/tRPC function.

Before redeploying, commit and push the updated `package.json`, `pnpm-lock.yaml`, `api/`, `server/`, and `vercel.json` files. Do not omit `pnpm-lock.yaml`. The old Wouter `patchedDependencies` entry has been removed, so Vercel no longer requires `patches/wouter@3.7.1.patch` during `pnpm install`.

The interface now references public CDN image URLs rather than Manus-only `/manus-storage/` paths, so its visual assets render on Vercel as well as in local development.

Set the following Vercel environment variables only if you enable the corresponding features: `DATABASE_URL`, `JWT_SECRET`, `OAUTH_SERVER_URL`, `VITE_APP_ID`, `VITE_OAUTH_PORTAL_URL`, `OWNER_OPEN_ID`, `BUILT_IN_FORGE_API_URL`, and `BUILT_IN_FORGE_API_KEY`. The public direct-file delivery path does not require a database or sign-in, but OAuth and storage integrations do.

## Key files

| File | Purpose |
| --- | --- |
| `server/downloadPolicy.ts` | URL validation and platform-extraction blocking rules. |
| `server/routers.ts` | The `download.prepare` tRPC contract. |
| `client/src/components/DownloadWorkbench.tsx` | Preview dialog, permission confirmation, and delivery link UI. |
| `server/downloadPolicy.test.ts` | Unit tests for direct URL validation. |
| `server/downloadRouter.test.ts` | Unit tests for the backend procedure. |
