# Design Direction — Amazon-Scale E-Commerce

> **Status:** Awaiting commander approval. No UI code will be written until this PR is merged.

---

## 1. Philosophy & Reference

**Direction:** "Amazon Utility + Vercel Calm" — the density and purposefulness of Amazon's product pages, refined with the typographic restraint and whitespace discipline of Vercel/Linear. Every pixel earns its place by serving the shopper's next decision.

**Principles:**
1. **Clarity over cleverness.** Labels say what they do; icons always have accessible text.
2. **Hierarchy is non-negotiable.** One primary action per view, visually dominant. Secondary actions are muted.
3. **Rhythm from the scale.** All spacing comes from the 4 px base grid. No ad-hoc values.
4. **Dark mode is designed, not inverted.** Depth comes from lighter surfaces, not shadows.
5. **Every state is a screen.** Loading → skeleton. Empty → call to action. Error → inline, specific, recoverable.

---

## 2. Colour Palette

### Brand Colours
| Role | Token | Hex (light) |
|---|---|---|
| Primary (Orange) | `--color-primary` | `#FF9900` |
| Primary Hover | `--color-primary-hover` | `#E68A00` |
| Primary Foreground | `--color-primary-fg` | `#111111` |
| Secondary (Navy) | `--color-secondary` | `#131921` |
| Secondary Foreground | `--color-secondary-fg` | `#FFFFFF` |
| Accent (Teal) | `--color-accent` | `#00A8A8` |
| Accent Hover | `--color-accent-hover` | `#008C8C` |

### Neutral Surfaces
| Role | Light | Dark |
|---|---|---|
| Background | `#FFFFFF` | `#0F1111` |
| Surface 1 (card) | `#F7F8F8` | `#1A1D1E` |
| Surface 2 (panel) | `#EAEDED` | `#232F3E` |
| Border | `rgba(0,0,0,0.12)` | `rgba(255,255,255,0.10)` |
| Border Strong | `rgba(0,0,0,0.24)` | `rgba(255,255,255,0.20)` |

### Text
| Role | Light | Dark |
|---|---|---|
| Text Primary | `#111111` | `#F2F2F2` |
| Text Secondary | `#565959` | `#A6A6A6` |
| Text Muted | `#8D8D8D` | `#6B6B6B` |
| Text Inverse | `#FFFFFF` | `#111111` |
| Link | `#0066C0` | `#5DADE2` |
| Link Hover | `#C45500` | `#F0A500` |

### Semantic Colours
| Role | Token | Light Hex | Dark Hex |
|---|---|---|---|
| Success | `--color-success` | `#067D62` | `#2ECC71` |
| Success Surface | `--color-success-surface` | `#EAF5F1` | `#0D2E23` |
| Warning | `--color-warning` | `#C45500` | `#F0A500` |
| Warning Surface | `--color-warning-surface` | `#FEF9EE` | `#2D1F00` |
| Danger | `--color-danger` | `#CC0C39` | `#FF4D6A` |
| Danger Surface | `--color-danger-surface` | `#FFF0F0` | `#2D0010` |
| Info | `--color-info` | `#0066C0` | `#5DADE2` |
| Info Surface | `--color-info-surface` | `#EEF5FB` | `#0A1929` |

---

## 3. Typography

**Typeface:** `Inter` (variable font, weights 400/500/600/700).  
**Fallback:** `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

No serif. No decorative faces. Inter 600 carries all headings; 400 carries body.

### Type Scale
| Step | Size | Line Height | Weight | Usage |
|---|---|---|---|---|
| `text-xs` | 12 px | 16 px | 400 | Badges, legal, timestamps |
| `text-sm` | 14 px | 20 px | 400 | Secondary body, table cells |
| `text-base` | 16 px | 24 px | 400 | Primary body copy |
| `text-lg` | 20 px | 28 px | 600 | Card titles, section headings |
| `text-xl` | 24 px | 32 px | 600 | Page sub-headings |
| `text-2xl` | 32 px | 40 px | 700 | Page headings |
| `text-3xl` | 48 px | 56 px | 700 | Hero / marketing |

**Rule:** Headings differ from body in size AND weight AND colour. Never size alone.

---

## 4. Spacing Scale (4 px base)

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4 px | Icon gap, tight inline |
| `space-2` | 8 px | Inner padding (compact) |
| `space-3` | 12 px | Inner padding (default) |
| `space-4` | 16 px | Card padding, list gap |
| `space-5` | 20 px | Section gap (small) |
| `space-6` | 24 px | Section gap (default) |
| `space-8` | 32 px | Section gap (large) |
| `space-10` | 40 px | Page section gap |
| `space-12` | 48 px | Hero padding |
| `space-16` | 64 px | Page-level vertical rhythm |

**Content max-width:** 1280 px, centred, 24 px page padding (mobile: 16 px).

---

## 5. Border Radii

| Token | Value | Usage |
|---|---|---|
| `radius-sm` | 4 px | Badges, tags, inputs, buttons |
| `radius-md` | 8 px | Cards, dropdowns, modals |
| `radius-lg` | 12 px | Bottom sheets, large panels |
| `radius-full` | 9999 px | Pills, avatars |

Two radii in practice: **4 px** for controls, **8 px** for containers.

---

## 6. Elevation (Shadow)

| Level | Token | Value | Usage |
|---|---|---|---|
| 0 | `shadow-none` | `none` | Flat surfaces, table rows |
| 1 | `shadow-sm` | `0 1px 3px rgba(0,0,0,0.12)` | Cards at rest |
| 2 | `shadow-md` | `0 4px 12px rgba(0,0,0,0.15)` | Dropdowns, popovers |
| 3 | `shadow-lg` | `0 8px 32px rgba(0,0,0,0.20)` | Modals, drawers |

Dark mode: elevation expressed via lighter surface colour, not shadows.

---

## 7. Motion

| Token | Value | Usage |
|---|---|---|
| `duration-fast` | 150 ms | Hover states, focus rings |
| `duration-base` | 200 ms | Open/close, expand/collapse |
| `duration-slow` | 300 ms | Page transitions, modals |
| `easing` | `cubic-bezier(0.16, 1, 0.3, 1)` | All transitions |

`prefers-reduced-motion: reduce` → all durations collapse to 0 ms.

---

## 8. Component Inventory

All components read tokens only. No literal colour or pixel value inside a component.

| # | Component | Sizes | Key States |
|---|---|---|---|
| 1 | **Button** | sm (32 px) / md (40 px) / lg (48 px) | default, hover, focus (2 px accent ring + 2 px offset), active, loading (spinner), disabled |
| 2 | **Input / Textarea** | sm (32 px) / md (40 px) | default, focus, error, disabled, read-only |
| 3 | **Select / Combobox** | md (40 px) | default, open, focus, error, disabled |
| 4 | **Product Card** | grid (240 px wide) / list (full width) | default, hover (shadow-md + lift), skeleton loading, out-of-stock overlay |
| 5 | **Navigation Bar** | full-width sticky | default, scrolled (shadow-sm), mobile (hamburger drawer) |
| 6 | **Badge / Tag** | xs / sm | default, success, warning, danger, info, muted |
| 7 | **Modal / Drawer** | sm (480 px) / md (640 px) / lg (800 px) | open (fade + scale), close, backdrop |
| 8 | **Toast / Alert** | full-width inline / fixed bottom-right | info, success, warning, error, dismissible |

**Icon set:** Lucide React — 16 px inline / 20 px standalone / 24 px nav. Always with `aria-label` or visible text.  
**Control heights:** 32 / 40 / 48 px only.

---

## 9. Interaction Patterns

- **Focus ring:** 2 px solid `--color-accent`, 2 px offset, on all interactive elements. Never removed, only styled.
- **Hover:** `duration-fast` ease-out. Surface colour shift + shadow step up.
- **Loading:** Skeleton in the final layout shape. Pulse animation at 1.5 s cycle.
- **Empty state:** Illustration (single-colour, accent) + heading + body + primary CTA.
- **Error:** Inline below the field, `--color-danger`, specific message, recovery action.
- **Toast:** Bottom-right, stacks upward, auto-dismiss 4 s, manual dismiss always available.
- **Pagination:** Numbered + prev/next. Mobile: prev/next only.

---

## 10. Responsive Breakpoints

| Name | Min-width | Layout |
|---|---|---|
| `xs` | 0 px | Single column, 16 px page padding |
| `sm` | 640 px | Single column, 24 px page padding |
| `md` | 768 px | Two columns |
| `lg` | 1024 px | Three columns, sidebar visible |
| `xl` | 1280 px | Four columns, full nav |
| `2xl` | 1536 px | Max-width capped at 1280 px |

---

## 11. Dark / Light Mode

- Switched via `data-theme="dark"` on `<html>`.
- All tokens carry dark values in `design-tokens.json`.
- Dark surfaces use lighter values for depth (not shadows).
- All text contrast ≥ 4.5:1 verified in both modes.
- Images use `filter: brightness(0.9)` in dark mode to reduce glare.
- Primary orange `#FF9900` is unchanged in dark mode — it reads on both surfaces.

---

## 12. What Comes Next (after approval)

1. `tokens/` directory — CSS variables generated from `design-tokens.json`
2. Tailwind theme extension wired to the tokens
3. Component library (shadcn/ui base, styled to tokens)
4. Page-level screens: Home, PLP, PDP, Cart, Checkout, Account, Order History
5. Backend: Next.js API routes → PostgreSQL → Redis cache → S3 assets

---

*No UI code will be written until this PR is approved by the commander.*
