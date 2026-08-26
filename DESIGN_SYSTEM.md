# Design system

## Palette
`#0B0B0B` black canvas · `#F4F3EF` warm white type · `#9B9A96` secondary text · `rgba(244,243,239,.22)` hairlines. No UI color accents.

## Type
Manrope is the workhorse sans for navigation and body copy. DM Mono is used for metadata, indexes, and utility labels. The home statement is 명조: Fraunces for Latin (`Remember`, with italic only on the inner `mem` of `Re-mem-ber`) and Noto Serif KR for Hangul (`기억`, never italic). Display type is fluid with a negative tracking value and compact line-height. The home wordmark is `雲住`. Hangul artist naming (`운주 김혜진`) is reserved for the artist page.

## Layout
Desktop uses a 12-column grid with 3vw gutters. Editorial modules can intentionally offset or span partial columns. Mobile collapses to a single image column with generous vertical pacing. Spacing units are based on viewport width for exhibition-scale breathing room: 3vw utility, 6vw section edge, 10–16vw editorial separation.

Tablet uses 8 columns and mobile uses 4 columns. The 70/20/10 grid rule applies: most modules align; offsets and full-bleed treatments need a compositional reason tied to an artwork or chapter transition.

## Palette enforcement
UI tokens are limited to `--black`, `--white`, grayscale text, and grayscale dividers. Gradients, overlays, controls, borders, focus states, cursors, and loading states must remain grayscale. Artwork image/video is the only normal exception. Do not apply an artistic color treatment to UI to compensate for missing artwork.

## Components
Header, Hero, SectionIntro, WorkCard, WorkIndex, DetailMedia, ArtistSection, Footer, AdminPanel. Components should own content semantics and expose motion through data attributes or small hooks rather than page-specific selectors.

Admin is deliberately a separate system: stable form labels, explicit publish status, undo or confirmation for destructive actions, visible save state, and no experimental pointer behavior.
