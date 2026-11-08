<?php

use App\Repositories\ProductRepository;
use App\Repositories\VacancyRepository;
use App\Repositories\SupplierRepository;
use App\Repositories\NewsArticleRepository;
use App\Repositories\ProductTechnologyRepository;

return [
    'output_path'        => public_path(),
    'max_urls_per_file'  => 45000,
    'max_bytes_per_file' => 45000000,
    'route_patterns'     => ['site.*'],
    'excluded_routes'    => ['site.search'],

    /**
     * Providers return iterable records with the configured parameter attributes
     * and an optional updated_at value. Route paths are always resolved by name.
     */
    'providers' => [
        'site.products.show' => [
            'source'     => [ProductRepository::class, 'sitemapRecords'],
            'parameters' => ['productSlug' => 'slug'],
        ],
        'site.products.product.technologies.show' => [
            'source'     => [ProductTechnologyRepository::class, 'sitemapRecords'],
            'parameters' => ['productTechnologySlug' => 'slug'],
        ],
        'site.products.product.technologies.suppliers.index' => [
            'source'     => [ProductRepository::class, 'sitemapTechnologySupplierRecords'],
            'parameters' => ['productTechnologySlug' => 'technology_slug', 'supplierSlug' => 'supplier_slug'],
        ],
        'site.suppliers.products' => [
            'source'     => [SupplierRepository::class, 'sitemapRecords'],
            'parameters' => ['supplierSlug' => 'slug'],
        ],
        'site.news.show' => [
            'source'     => [NewsArticleRepository::class, 'sitemapRecords'],
            'parameters' => ['newsArticleSlug' => 'slug'],
        ],
        'site.vacancy' => [
            'source'     => [VacancyRepository::class, 'sitemapRecords'],
            'parameters' => ['slug' => 'slug'],
        ],
    ],
];
