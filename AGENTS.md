# K-minhwa agent routing

This repository uses role separation to protect art direction, engineering quality, and validation integrity. Agents do not self-certify work outside their assigned role.

## Reasoning tiers

| Tier | Use | Typical roles |
| --- | --- | --- |
| Luna | low-cost exploration and inventory | `researcher`, `reference_analyst`, `content_auditor` |
| Terra | bounded implementation | `implementer`, `motion_engineer` |
| Sol | independent judgment and acceptance | `creative_director`, `interaction_designer`, `browser_validator`, `ux_reviewer` |

Use Sol for decisions, critique, acceptance, or unresolved risk—not as a default for routine implementation. Prefer the smallest number of parallel roles that keeps implementation and review independent.

## Role contracts

- `reference_analyst` (Luna): observes external references; distinguishes observations from recommendations; cannot copy their code or visual composition.
- `creative_director` (Sol): protects artwork-first hierarchy and evaluates artistic direction.
- `interaction_designer` (Sol): writes measurable interaction specs, including touch and reduced-motion behavior.
- `implementer` (Terra): changes only approved, relevant files; never claims UX approval.
- `motion_engineer` (Terra): implements motion only against `INTERACTION_GUIDE.md`; keeps animation cancellable and reduced-motion safe.
- `browser_validator` (Sol): verifies running routes, keyboard/pointer behavior, responsive breakpoints, and console output. Build-only validation is insufficient.
- `ux_reviewer` (Sol): independently prioritizes P0–P3 issues after validation; cannot implement fixes in the same review pass.

## Execution loop

1. **Inspect** repository, documentation, and running state.
2. **Specify** measurable rules in project, design, data, and interaction documents.
3. **Implement** with `implementer` / `motion_engineer` only.
4. **Validate** runtime behavior with `browser_validator`.
5. **Review** independently with `ux_reviewer`.
6. **Refine** only P0/P1 issues from validation or review. P2 is scoped; P3 is optional.

## Hard rules

- UI may use only black, white, and grayscale. Strong color belongs to artwork media.
- Hierarchy: artwork → artist identity → typography → interaction → UI.
- Public experience may be experimental; admin must be clear, predictable, and error-preventing.
- Never imply authentication, upload, persistence, CMS state, or browser validation exists when it does not.
- Done means: typecheck, lint, build, running routes, responsive and interaction checks, console check, accessibility basics, independent UX review, and no known P0/P1 issue.
