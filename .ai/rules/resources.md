---
paths:
    - "app/Http/Resources/**"
---

# Resources

## Explicit relationship loading

Guard resource relationships with whenLoaded() and compose them through their related Resource classes.

## Extend the application BaseResource

Extend App\Http\Resources\BaseResource\BaseResource for versioned API resources so shared resource and collection
behavior remains available.
