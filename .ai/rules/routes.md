---
paths:
    - "routes/**"
---

# Routes

## Controller-backed application routes

Point application routes at controller classes or controller methods; do not define application HTTP behavior in route
closures.

## Assign middleware at route registration

Attach HTTP middleware to route groups or individual routes, not to controller classes.
