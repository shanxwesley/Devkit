# DevKit

AI-powered document and code toolkit for students and developers.

Format JSON, edit Markdown, generate READMEs, explain errors, and create technical reports — all in one clean interface.

## Features (MVP)

| Tool | AI? | Status |
|------|-----|--------|
| JSON Formatter & Validator | No | ✅ Fully working (client-side) |
| Markdown Editor + GFM Preview | No | ✅ Fully working |
| README Generator | Optional | ✅ Template + simulated AI improve |
| AI Error Explainer | Yes | ✅ UI + mock streaming (plug real API) |
| Technical Report Generator | Yes (Premium) | ✅ Form + preview + premium gate |

Also included:
- Tool registry architecture (add a new tool = one folder + one registry entry)
- Dark / light mode (persisted)
- Copy & Download buttons
- Responsive split-pane layouts
- Pricing page with Free / Premium comparison
- Auth & Dashboard stubs
- Express backend skeleton with AI + usage services

## Tech Stack

- **Frontend:** React 18 + Vite + TypeScript + Tailwind CSS
- **Editor:** Monaco (`@monaco-editor/react`)
- **Markdown:** `react-markdown` + `remark-gfm`
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Backend (skeleton):** Node.js + Express
- **Future:** Prisma + PostgreSQL, Clerk/Supabase Auth, Anthropic/OpenAI

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the frontend
npm run dev
# → http://localhost:5174

# 3. (Optional) Start the API server
npm run server
# → http://localhost:3001
```

## Project Structure

```
src/
  tools/
    json-formatter/     # self-contained tool
    markdown-editor/
    readme-generator/
    error-explainer/
    report-generator/
    registry.ts         # single source of truth for all tools
  components/           # shared UI (ToolLayout, CopyButton, etc.)
  pages/                # Home, Pricing, Login, Signup, Dashboard, ToolPage
  lib/                  # utils
  server/
    services/           # ai.service.js, usage.service.js
    index.js            # Express entry
```

## Adding a New Tool

1. Create `src/tools/my-tool/index.tsx` that exports a component.
2. Add an entry to `src/tools/registry.ts`.
3. Done — the home page and routing pick it up automatically.

## AI Integration (next step)

1. Copy `.env.example` → `.env` and add your `ANTHROPIC_API_KEY` (or OpenAI).
2. Replace the stubs in `src/server/services/ai.service.js`.
3. Wire the frontend tools to call `/api/ai/...` instead of the local mocks.
4. Enforce limits with `usage.service.js` + a real database.

## Deployment Notes

- Frontend → Vercel
- Backend → Render / Railway
- Database → managed Postgres (Neon, Supabase, Railway, etc.)

## Deploy to Vercel (frontend)

The frontend is a static Vite app, so Vercel needs no environment variables.

1. Push the repo to GitHub.
2. In Vercel: **Add New → Project**, import the repo.
3. Framework preset: **Vite** (auto-detected). Build: `npm run build`, Output: `dist`. These are already set in `vercel.json`.
4. Click **Deploy**.

`vercel.json` rewrites all routes to `index.html`, so deep links like `/pricing` and `/tools/json-formatter` work on refresh.

Once the API is deployed (Render / Railway), add its URL as `VITE_API_URL` in Vercel's project settings and point the tools at it. Never put secret keys (`ANTHROPIC_API_KEY`) in `VITE_*` variables, since those are bundled into public JavaScript.

## License

MIT
