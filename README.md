# Midnight — personal portfolio

A fully static, multi-page personal website. No build tools, no frameworks —
just HTML5, CSS3, and vanilla JavaScript. Design language follows the
"Warm Humanist" (Headspace/Calm-inspired) style: warm peach and coral tones,
rounded everything, gentle breathing animations, and a custom moon mascot.

## Structure

```
/
├── index.html          Home
├── about.html           About / story / skills
├── projects.html        Project cards
├── photography.html     Photo gallery with filters
├── contact.html          Contact links
├── css/
│   ├── style.css         Design tokens, layout, components
│   ├── animations.css    Keyframes & motion
│   └── responsive.css    Tablet / mobile breakpoints
├── js/
│   ├── main.js           Nav, theme toggle, scroll reveal, page transitions
│   └── gallery.js        Photography filters + lightbox
├── images/               Placeholder gallery photos (SVG) — swap these out
├── icons/                Standalone SVG icon set
└── assets/               Reserved for future illustrations
```

## Deploying to GitHub Pages

1. Create a new GitHub repository (or use an existing one).
2. Push all these files to the repository root (keep the folder structure as-is).
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch",
   choose the branch (usually `main`) and the `/ (root)` folder.
5. Save. GitHub will give you a URL like `https://yourusername.github.io/repo-name/`.
6. That's it — no build step required, it's ready as-is.

## Replacing the photography placeholders

Open `photography.html` and look for the `<img>` tags inside `.gallery-grid`.
Each one currently points to a placeholder SVG in `images/`. Swap the `src`
to your own photo (jpg/png/webp all work), keep the `data-category`
attribute so the filter buttons keep working, and try to keep a roughly
4:5 portrait crop for the tidiest grid.

## Adding a new project

Copy one of the `<article class="card project-card">` blocks in
`projects.html`, update the icon, title, description, tags, and the
GitHub link. Drop it in before the "More on the way" card.

## Notes

- Day/night toggle (top right) switches the whole palette to a warm dark-teal
  night mode — saved in `localStorage`, never a cold navy blue.
- All animations respect `prefers-reduced-motion`.
- No external JS dependencies — only Google Fonts (Baloo 2, Nunito, Caveat)
  are loaded via CDN in `style.css`.