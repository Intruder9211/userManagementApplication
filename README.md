# User Management App (React + TypeScript)

This is a simple CRUD application built with **React + TypeScript + Vite** that demonstrates creating, reading, updating, and deleting users using the public [JSONPlaceholder API](https://jsonplaceholder.typicode.com/).

> Note: JSONPlaceholder simulates changes. POST/PUT/DELETE will return simulated responses but won't change server data.

## What you get in this ZIP
- Full source code (TypeScript, React Router)
- Instructions to run locally
- Guidance to create a GitHub repo and deploy to Vercel/Netlify
- Simple responsive styling and loading spinner
- Error handling and comments in code

---

## Quick local setup

1. Make sure you have Node.js installed (>=16) and npm or yarn.
2. Extract the ZIP and open a terminal in the project folder.
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```
4. Run the dev server:
   ```bash
   npm run dev
   ```
5. Open the provided localhost URL (usually http://localhost:5173)

---

## Project structure (important files)
- `src/main.tsx` - app bootstrap
- `src/App.tsx` - routing + layout
- `src/pages/Home.tsx` - list + delete
- `src/pages/UserDetail.tsx` - view single user
- `src/pages/UserForm.tsx` - create & edit user
- `src/api.ts` - API wrapper with fetch calls
- `src/styles.css` - responsive styles

---

## Creating a GitHub repository & pushing code

1. Create a new repository on GitHub (no README, no .gitignore needed).
2. Push local code:
   ```bash
   git init
   git add .
   git commit -m "Initial: user management React + TypeScript app"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

---

## Deploy to Vercel (recommended)

1. Sign up / login to Vercel.
2. Click "New Project" -> Import Git Repository -> Choose your GitHub repo.
3. Vercel will auto-detect `vite` + `react`; default build command: `npm run build`, Output Directory: `dist`.
4. Deploy. Vercel will give you a live URL (e.g. `https://your-app.vercel.app`).

## Deploy to Netlify

1. Sign up / login to Netlify.
2. Connect your GitHub repo and configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy and get your live URL.

---

## Notes & Troubleshooting

- Because JSONPlaceholder doesn't persist changes, newly created users won't appear if you reload from the server — created/updated/deleted operations are simulated (the API returns the data you sent).
- If CORS or network errors occur, check your network and browser console.
- For production, replace the demo API with a real backend.

---

If you'd like, I can:
- Convert styling to Tailwind or add a nicer UI library.
- Add pagination, search, or sorting.
- Add unit tests and CI workflow.

Enjoy! 🚀
