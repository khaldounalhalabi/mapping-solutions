---
paths:
    - "resources/js/**"
---

# Js

## Inertia React web stack

Build web UI with Inertia v3 and React/TypeScript. Use Inertia client APIs for forms, links, navigation, and page props.

## Namespaced localization keys

Use namespaced, dot-separated localization keys through the typed translation hook. Do not use full source sentences as translation keys.

## Central HTTP client for standalone JSON requests

Use modules/http/Http for standalone JSON endpoint calls, including datatables and async selects. Keep ordinary Inertia
page data in page props.

## Ziggy routes for internal URLs

Generate internal URLs with the global Ziggy route () helper. Reserve raw anchors for external, protocol, and download
links.
