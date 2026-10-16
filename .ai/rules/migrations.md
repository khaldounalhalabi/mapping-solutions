---
paths:
    - "database/migrations/**"
---

# Migrations

## Model-aware cascading foreign keys

Define model-backed foreign keys with foreignIdFor(Model::class)->constrained()->cascadeOnDelete(); place nullable() before constrained() when needed.
