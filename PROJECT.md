# K-minhwa

## Product intent
K-minhwa is a contemporary portfolio and moving archive for a Korean minhwa artist. The site should feel like an art book opened in motion: sparse, exacting, image-led, and editorial rather than templated.

## Information architecture

- `/` — cinematic homepage: hero statement, selected works, artist entry point.
- `/works` — editorial index of all works with year, medium, and image-led composition.
- `/works/[slug]` — work detail with primary media, metadata, and contextual text.
- `/artist` — statement, biography, exhibitions, awards, and collections.
- `/admin` — authenticated content studio for works, artist profile, homepage, media, and ordering.

## Content model boundaries
The public site reads published records only. Admin edits draft content, uploads media, arranges order, and publishes. Firebase Auth and Firestore are the configured source of truth; Storage remains unavailable until the Firebase billing account is enabled, so the admin currently accepts verified media URLs rather than simulating uploads.

### Catalogue integrity

No stock image may be presented as a K-minhwa artwork. Until original artwork photography/video and verified catalogue data are published in Firestore, the site renders labeled grayscale archive plates. This is intentional: the home hero can use the supplied artist video, but every work card must be traceable to an original image, title, year, material, and alt text before it receives the artwork treatment.

## Direction
UI is black, white, and grayscale. Artwork media can retain color and is the only chromatic field. Typography is large, expressive, and mostly sans with selective serif contrast. No decorative minhwa clichés.

## Reference translation
Lama Lama's observed principles—persistent utility navigation, statement-led oversized type, hover-revealed project context, image/video-led modules, reactive buttons, and a footer-as-closing-panel—are translated into a quieter archive system. K-minhwa uses pointer drift and magnetic affordances only where they help orientation or create a sense of materiality.

## Editorial grid rule
Use 12 columns on desktop, 8 on tablet, and 4 on mobile. Approximately 70% of modules align to the grid, 20% may use intentional offsets, and 10% may be full bleed. Irregularity must reinforce the artwork sequence; it cannot be random decoration.

## Home Hero specification

| Property | Requirement |
| --- | --- |
| Media | One full-screen artwork video or still; colored media is the hero’s only strong color. |
| Copy | Kicker, display statement, and max 155-character supporting sentence. |
| Desktop pointer | Hero media shifts at most 12px per axis; copy and header do not shift. |
| Motion | 450–700ms eased return; no loop required for a still. |
| Touch | No pointer drift; media stays stable. |
| Reduced motion | No transform, no autoplay; use poster/still image. |
| Accessibility | Copy remains readable at 4.5:1 effective contrast; cue is non-essential. |

## Works Index specification

| Property | Requirement |
| --- | --- |
| Layout | 12/8/4-column editorial grid; metadata retains source order. |
| Desktop pointer | Media translation max 8px and scale max 1.02; title/metadata never moves. |
| Hover/focus | Reveal color or remove a grayscale veil within 240–420ms; keyboard focus gets the same information. |
| Touch | No hover dependency; title, year, medium, and route stay visible. |
| Reduced motion | No pointer transform or scale; normal focus and color state remain. |
| Performance | Respect `prefers-reduced-motion`; do not load decorative motion that delays visible artwork. |
