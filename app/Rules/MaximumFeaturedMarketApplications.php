<?php

namespace App\Rules;

use Closure;
use App\Models\MarketApplication;
use App\Repositories\MarketApplicationRepository;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

readonly class MaximumFeaturedMarketApplications implements ValidationRule
{
    public function __construct(private int|string|null $ignoredMarketApplicationId = null) {}

    /**
     * Run the validation rule.
     *
     * @param Closure(string, ?string=): PotentiallyTranslatedString $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! filter_var($value, FILTER_VALIDATE_BOOL)) {
            return;
        }

        $count = MarketApplicationRepository::make()->featuredCount(
            $this->ignoredMarketApplicationId
                ? [$this->ignoredMarketApplicationId]
                : [],
        );

        if ($count >= MarketApplication::MAX_FEATURED) {
            $fail(trans('site.maximum_featured_market_applications'));
        }
    }
}
