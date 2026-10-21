# Login Page

A clean, self-contained login page — no build step, no backend, no dependencies.

## Files

| File | Contents |
|------|----------|
| `index.html` | Markup — email field, password + show/hide toggle, remember checkbox, submit button, accessible live regions |
| `styles.css` | Design tokens (light + dark themes), all component styles, responsive breakpoint |
| `app.js` | Inline validation, show/hide toggle, simulated async submit with loading state, dark-mode toggle with `localStorage` persistence |

## Usage

Open `index.html` directly in a browser — or serve the directory:

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## Features

- **Email / password fields** with inline validation on submit and on blur
- **Show / hide password** toggle (accessible, `aria-pressed`)
- **"Forgot password?"** link
- **"Keep me signed in"** custom-styled checkbox
- **Dark mode** toggle — respects `prefers-color-scheme`, persists to `localStorage`
- **Accessible** — `aria-required`, `aria-describedby`, `role="alert"` on error spans, `aria-live` status region
- **Responsive** — card fills width on mobile (≤ 480 px)
- **Reduced-motion** safe — all transitions disabled when the OS preference is set

## Design tokens

All visual decisions (colours, spacing, type scale, radii, shadows) live as CSS custom properties at the top of `styles.css`. Swap the accent colour by changing `--color-accent` in `:root`.

## CI

GitHub Actions runs `htmlhint` on `index.html` and `eslint` on `app.js` on every push and pull request.
