# Firebase / Firestore data model

Firestore is the content source of truth. Public reads are limited to published records; writes require Firebase Auth and Firestore Security Rules verifying an allowlisted admin UID or a custom `admin` claim.

## `works/{workId}`
`slug`, `title`, `year`, `medium`, `description`, `status`, `sortOrder`, `publishedAt`, `createdAt`, `updatedAt`, plus localized `ko` and `en` content fields.

## `works/{workId}/images/{imageId}`
`url`, `alt`, `caption`, `kind` (`image|video`), `sortOrder`, `width`, `height`. Until Firebase Storage is available, `url` is a manually managed public asset URL; Admin must not expose a fake upload action.

## `artist/profile`
`name`, localized `statement` and `biography`, `portraitMediaId`, `updatedAt`.

## `artist/careers/{careerId}`
`yearStart`, `yearEnd`, `category`, localized `title`, `organization`, `location`, `sortOrder`.

## `homepage/current`
`heroMediaId`, localized `heroKicker`, `heroTitle`, `heroBody`, `selectedWorkIds`, `published`, `updatedAt`.

## `media/{mediaId}`
`url`, `kind`, `alt`, `mimeType`, `width`, `height`, `durationSeconds`, `metadata`, `createdAt`. `storagePath` is deferred until Firebase Storage is enabled.

## `settings/site`
Localized site title, social links, analytics toggles, and feature flags.

## Auth, Storage, and analytics
Use Firebase Auth for admin sign-in and custom claims or admin UID allowlists in Security Rules. Until Storage is enabled, media is URL-based and uploads are intentionally unavailable. GA4 loads only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is present; verify it through DebugView before declaring analytics active.

## Implementation state
Firebase project, Firestore rules, Google sign-in, GA4 measurement ID, public URL media fields, works CRUD, ordering, and KR/EN profile/homepage fields now exist in the application. The admin UI uses real Firebase operations and correctly surfaces a permission error until an `admin` custom claim (or equivalent allowlist) is granted; it must not be presented as enabled before that bootstrap step. Firebase Storage, a custom-claim issuer, careers/media CRUD, public Firestore rendering, and GA4 DebugView verification are still pending.
