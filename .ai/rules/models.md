---
paths:
    - "app/Models/**"
---

# Models

## Attribute-based mass assignment

Declare mass-assignable attributes with #[Fillable([...])]. Add #[Guarded([...])] when an explicit guarded list is required.

## Dedicated translated and media casts

Represent translated and media-backed values through the project's Translatable and MediaCast casts and their serializer value objects. Add HasMedia to models with media casts.

## Generic spreadsheet integration

Customize spreadsheet behavior through exportable, importable, export, or import methods on the model.

## Trait-driven slug generation

Add Sluggable to slugged models and define source, destination, and optional separator settings in sluggable().

## Model-declared list search metadata

Declare searchable fields on models with searchableArray () and relationsSearchableArray (); consume them through the
shared BaseQuery pipeline.
