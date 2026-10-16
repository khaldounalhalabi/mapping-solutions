---
paths:
    - "app/Repositories/**"
---

# Repositories

## Versioned service-repository CRUD architecture

Put Eloquent querying and persistence in repositories extending BaseRepository, with each repository setting $modelClass.

## Explicit relationship loading

Eager-load the relationship list supplied by the service.

## Length-aware repository pagination

Use the shared repository pagination path backed by paginate() so index responses retain totals and page metadata.

## Generic spreadsheet integration

Route spreadsheet import and export through BaseImporter and BaseExporter rather than implementing spreadsheet handling in feature repositories.
