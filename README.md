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

## Adding your own photos

The gallery is entirely data-driven — open `js/gallery.js` and edit the
`PHOTOS` array at the top. Each entry is just:

```js
{ src: 'images/your-photo.jpg', category: 'nature', ratio: '3/4' }
```

- `src` — path to the image file (drop your real photos into `images/`)
- `category` — one of `nature`, `street`, `architecture`, `random` (or add
  your own — just also add a matching filter button in `photography.html`
  and a label in the `CATEGORY_LABELS` object)
- `ratio` — the photo's aspect ratio as `"width/height"` (e.g. `"3/4"`,
  `"4/3"`, `"16/9"`, `"9/16"`, `"1/1"`). This reserves the right amount of
  space before the image finishes loading so the masonry grid doesn't jump
  around — set it to whatever ratio your photo actually is.

Nothing in `photography.html` needs to change — the page just has an empty
`.gallery-grid` container that JS fills in. The layout itself is a true
masonry (CSS multi-column with `break-inside: avoid`), so photos of mixed
orientations and ratios sit together naturally, Pinterest-style, with no
JS layout library involved. Order doesn't matter — columns fill
top-to-bottom automatically.

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