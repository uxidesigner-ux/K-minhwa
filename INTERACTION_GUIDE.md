# Interaction guide

## Observed Lama Lama behavior (reference only)
The live page has a persistent compact header, oversized statement typography, layered media modules, project cards that reveal additional context, repeated labels inside interactive controls, and a footer that works as a final contact/social panel. Motion is tactile and energetic, while navigation and text stay legible without it. These are observed interaction principles—not assets, layouts, code, or styling to reproduce.

## Proposed K-minhwa behavior
- Cursor: default cursor stays quiet. A desktop-only liquid-glass ring (65px idle, ≈120% of the prior size) may appear over the page, with 80–120ms lag and a filled warm-white center dot. Over links and controls the outer ring scales down to the center-dot size so button hover states stay readable. Omit on touch.
- Mouse-follow: hero media drifts at most 6px after the pointer has moved ≥10px, with a 450–700ms eased return. Work media moves at most 8px. No constant shake or forced distortion.
- Magnetic links: apply max 6px attraction only to index links and the circular “view all” control. Snap back in 280–420ms. Never use magnetism on body text or primary navigation.
- Image reactions: artwork may start with a grayscale veil; hover/focus restores color in 240–420ms and allows max 1.02 scale. Keep crop and all metadata stationary.
- Background: black canvas remains stable. Optional grayscale grain or luminance shift must be near imperceptible and never compete with a colored artwork.
- Scroll transitions: labels and text may reveal with 12–24px translation and opacity; large images may use a clip or max 1.03 scale. Duration: 400–700ms. Avoid scroll-jacking. Native scroll is always preserved.
- Header: persistent split chrome on public routes (home, works, artist, work detail). Work/Artist are the only primary destinations. Admin keeps a separate non-split bar and is not public navigation. The chrome splits into two inset pills: mark + menu on the left, locale toggle on the right. Wordmark is `雲住`.
- Footer: sparse closing panel with mark, location/year, and one onward link; no sitemap wall. The home route has no footer bar; a colophon `© K-MINHWA UNJOO.` sits at the bottom inset.
- Typography: H1 is the visual event. Home English is a single Cormorant Garamond word (`Remember` as `Re` + italic `mem` + `ber`). Home Korean is a single Nanum Myeongjo word (`기억`) with no italic. Hanja always uses Nanum Myeongjo. H2 is a quieter editorial anchor; mono labels provide cataloguing. Keep body measure under ~40rem.
- Home chrome: both home pills use `border-radius: 999px` and share the same inset as the top edge (18px desktop, 12px mobile). The locale pill’s inner padding is equal on all sides after accounting for the 1px border (7px desktop / 5px mobile around a 42px / 40px toggle). Locale labels use ISO 639-1 (`EN` / `KO`). On desktop, the supporting archive sentence and ENTER ARCHIVE control sit on the right edge (`right: 6vw`); on mobile they left-align to the main copy column (`left: 5vw`). Hangul `운주 김혜진` is reserved for the artist page.
- ENTER ARCHIVE: hover increases letter-spacing only; the arrow and glyph widths do not stretch. Reduced-motion keeps the resting metrics.
- Project grid: asymmetrical 12-column composition on desktop; alternating offsets imply a moving book. On mobile, stack and preserve sequence numbers.
- Responsive: remove pointer-only effects below 768px, reduce display scale carefully, retain whitespace, and keep metadata visible at 390px width.
- Reduced motion: disable pointer transforms, autoplay, clip reveals, and magnetic easing. Preserve color, contrast, focus states, and document order.

## Accessibility
Every media item needs alt text. Focus styles must be visible in grayscale. Hover is enhancement only; all work titles and routes remain keyboard reachable.

## Content integrity and loading states
- A work card may present color only when it is backed by a published `works` record with an original artwork image, title, year, material, and alt text.
- Before that record exists, the public index uses a grayscale archive plate labelled as documentation pending. Placeholder imagery must never be paired with invented titles, materials, years, or artist claims.
- Every work frame reserves its final aspect ratio before the image loads. Remote artwork uses a grayscale skeleton/plate until the image is ready; it must not create a blank page region.
- At 390px, the home headline is a single word capped at 96px with at least `-0.04em` tracking.
- Header links preserve their 11px catalogue-label appearance but expose a 44px minimum pointer and touch target. Visible keyboard focus uses a 1px warm-white outline with 5px offset.

## Home entry sequence
- First visit in a browser session: black overlay → a visible 00–92% count lasting at least 3 seconds and waiting for hero-video `canplaythrough` → 100% → K-minhwa cell mark → monochrome cell field → fog-like reveal. The video is requested with `preload="auto"`; slower video loading extends the waiting phase rather than pretending completion.
- Returning visit in the same session: 180ms reveal only. `prefers-reduced-motion` uses an 80ms fade and never displays the full sequence.
- The entry layer is `aria-hidden`, holds no focusable controls, and is removed at completion. Hero content remains in document order throughout.
- The cell field is an abstract catalogue grid, not a reproduction of any reference logo or graphic. Desktop is capped at 72 cells; compact screens show 24.

## Hero particles
- Fine-pointer desktops only, after entry has completed. Default cursor remains visible.
- Canvas is scoped to the hero and uses `pointer-events: none`; particles are warm-white dots within a maximum 176px diameter field, with 360–660ms lives.
- Cap at 56 particles, 5 emissions per pointer update, and DPR 1.5. Render only while particles exist; cancel the animation frame and clear the canvas for hidden tabs, touch, or reduced motion.

## WebGL distortion and custom cursor
- WebGL is restricted to the hero video texture. A fine-pointer desktop can produce a local UV refraction around the pointer only after ≥10px of pointer travel (maximum 1.6% displacement within a 32% radial field); it never shifts text, CTA, header, or artwork metadata.
- The original video remains in the DOM as a fallback. If WebGL or video texture setup fails, the canvas stays inert and the standard video/poster remains visible.
- The custom cursor is a liquid-glass 65px ring with a filled center dot. Over interactive targets the outer ring scales to the center-dot size (~7px) so control hover states remain visible. It replaces the native cursor only for fine pointers, and is absent for touch, mobile, and reduced-motion users.
- WebGL uses a DPR ceiling of 1.5, a low-power context, and stops its render loop while the document is hidden.
