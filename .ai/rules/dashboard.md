---
paths:
    - "resources/js/pages/dashboard/**"
    - "resources/js/pages/dashboard/**/index.tsx"
---

# Dashboard

## Resource-grouped dashboard pages

Organize dashboard CRUD pages by resource, using index.tsx, create.tsx, edit.tsx, and show.tsx for the matching
controller actions.

## Inertia forms through the shared form shell

Manage dashboard form state and submission with Inertia useForm, then render fields through the shared Form component
and pass its processing state.

## Shared JSON-backed dashboard datatables

Build dashboard resource indexes with the shared Datatable. Let it own search, filtering, sorting, and pagination state
while the page supplies the typed JSON endpoint and schema.
