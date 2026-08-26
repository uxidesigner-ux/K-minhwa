# Interaction guide

## Observed Lama Lama behavior (reference only)
The live page has a persistent compact header, oversized statement typography, layered media modules, project cards that reveal additional context, repeated labels inside interactive controls, and a footer that works as a final contact/social panel. Motion is tactile and energetic, while navigation and text stay legible without it. These are observed interaction principles—not assets, layouts, code, or styling to reproduce.

## Proposed K-minhwa behavior
- Cursor: default cursor stays quiet. A desktop-only ring may appear over links and media, with 80–120ms lag and a maximum 28px diameter; it never obscures artwork. Omit on touch.
- Mouse-follow: hero media drifts 6–12px opposite the pointer with a 450–700ms eased return. Work media moves at most 8px. No constant shake or forced distortion.
- Magnetic links: apply max 6px attraction only to index links and the circular “view all” control. Snap back in 280–420ms. Never use magnetism on body text or primary navigation.
- Image reactions: artwork may start with a grayscale veil; hover/focus restores color in 240–420ms and allows max 1.02 scale. Keep crop and all metadata stationary.
- Background: black canvas remains stable. Optional grayscale grain or luminance shift must be near imperceptible and never compete with a colored artwork.
- Scroll transitions: labels and text may reveal with 12–24px translation and opacity; large images may use a clip or max 1.03 scale. Duration: 400–700ms. Avoid scroll-jacking. Native scroll is always preserved.
- Header: persistent, compact, transparent over hero and black elsewhere. Work/Artist are the only primary destinations. Admin is not public navigation.
- Footer: sparse closing panel with mark, location/year, and one onward link; no sitemap wall.
- Typography: H1 is the visual event, H2 is a quieter editorial anchor, mono labels provide cataloguing. Keep body measure under ~40rem.
- Project grid: asymmetrical 12-column composition on desktop; alternating offsets imply a moving book. On mobile, stack and preserve sequence numbers.
- Responsive: remove pointer-only effects below 768px, reduce display scale carefully, retain whitespace, and keep metadata visible at 390px width.
- Reduced motion: disable pointer transforms, autoplay, clip reveals, and magnetic easing. Preserve color, contrast, focus states, and document order.

## Accessibility
Every media item needs alt text. Focus styles must be visible in grayscale. Hover is enhancement only; all work titles and routes remain keyboard reachable.

## Content integrity and loading states
- A work card may present color only when it is backed by a published `works` record with an original artwork image, title, year, material, and alt text.
- Before that record exists, the public index uses a grayscale archive plate labelled as documentation pending. Placeholder imagery must never be paired with invented titles, materials, years, or artist claims.
- Every work frame reserves its final aspect ratio before the image loads. Remote artwork uses a grayscale skeleton/plate until the image is ready; it must not create a blank page region.
- At 390px, the hero headline is capped at 72px, has at least `-0.04em` tracking, and its first line is an intentional non-breaking editorial unit (`Things that`).
- Header links preserve their 11px catalogue-label appearance but expose a 44px minimum pointer and touch target. Visible keyboard focus uses a 1px warm-white outline with 5px offset.
