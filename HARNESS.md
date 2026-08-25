# K-minhwa delivery harness

## Required gates

| Gate | Owner | Measurable acceptance |
| --- | --- | --- |
| Documentation | Luna / Sol | `AGENTS.md`, `HARNESS.md`, `PROJECT.md`, `DESIGN_SYSTEM.md`, `INTERACTION_GUIDE.md`, and `DATA_MODEL.md` agree on scope and state. |
| Implementation | Terra | Only task-relevant files change; components compile without unsafe type escapes. |
| Typecheck + lint | Terra | `tsc --noEmit` and lint command exit 0. |
| Build | Terra | Production build exits 0. |
| Runtime | Sol | `/`, `/works`, `/works/[slug]`, `/artist`, `/admin` render without blocking errors. |
| Interaction | Sol | Hero response, work-card hover/focus, navigation, reduced motion, and touch fallback meet `INTERACTION_GUIDE.md`. |
| Responsive | Sol | 1440px, 768px, and 390px layouts preserve readable metadata and no horizontal overflow. |
| Accessibility basics | Sol | Keyboard navigation reaches all visible links; focus is visible; images have text alternatives; contrast is readable. |
| UX review | Sol | Independent issue list uses P0–P3; no P0/P1 remains. |

## Evidence rules

- Build success is necessary but never proof of interaction quality.
- Browser validation must be from a running local route; record the tested viewport widths and interactions.
- Do not report unrun checks as passed. Mark unavailable checks as blocked with the cause.
- A review only produces findings. Implementation occurs in a separate refine cycle.

## Priority policy

- **P0:** security, data loss, inaccessible primary route, broken production route.
- **P1:** primary flow, artwork hierarchy, responsive, or interaction failure.
- **P2:** noticeable but non-blocking clarity or polish problem.
- **P3:** discretionary refinement with a clear benefit.

## Current implementation boundary

The public UI uses local placeholder content and external placeholder images until Firestore has published work records; the works index then reads those published records. The administrator UI now has real Firebase Google sign-in, Firestore works CRUD, URL media fields, ordering, and KR/EN profile/homepage fields. It exposes permission errors until the Firebase `admin` claim is issued; it does not fake authorization. Firebase Storage remains unavailable on the current plan, so no upload control is shown. Homepage/artist public Firestore rendering, careers/media CRUD, analytics DebugView verification, and a custom-claim issuer remain pending.

## Latest validation evidence

- Lint, typecheck, and production build passed on 2026-08-25.
- Runtime: public home, works index, and admin sign-in boundary were rendered from the production build.
- Interaction: desktop hero pointer moved media by 4.9px / -2px in the sampled move (within the 12px maximum); mobile work media remained at scale 1 with no pointer transform.
- Responsive: works index at desktop and 390px had no horizontal overflow; four work cards remained available.
- Console: the fresh production validation tab reported no errors.
