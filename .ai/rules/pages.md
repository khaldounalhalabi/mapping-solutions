---
paths:
    - "resources/js/pages/**"
---

# Pages

## Central page-family layout selection

Keep pages layout-free. Select the auth, dashboard, or site layout centrally in createInertiaApp from the Inertia page
name.

## Typed resource models at page boundaries

Represent serialized server resources with interfaces in resources/js/models and use those model types in page prop
signatures. Keep app-wide Inertia props in the shared InertiaConfig augmentation.
