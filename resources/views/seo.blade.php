@php ($seo = $page['props']['seo'])
<title data-inertia="">{{ $seo['title'] }}</title>
<meta data-inertia="robots" name="robots" content="{{ $seo['robots'] }}" />
@if ($seo['canonical'])
    <link
        data-inertia="canonical"
        rel="canonical"
        href="{{ $seo['canonical'] }}"
    />
    @foreach ($seo['alternates'] as $locale => $href)
        <link
            data-inertia="alternate-{{ $locale }}"
            rel="alternate"
            hreflang="{{ $locale }}"
            href="{{ $href }}"
        />
    @endforeach
    <meta
        data-inertia="description"
        name="description"
        content="{{ $seo['description'] }}"
    />
    <meta
        data-inertia="og:url"
        property="og:url"
        content="{{ $seo['canonical'] }}"
    />
    <meta
        data-inertia="og:type"
        property="og:type"
        content="{{ $seo['type'] }}"
    />
    <meta
        data-inertia="og:title"
        property="og:title"
        content="{{ $seo['title'] }}"
    />
    <meta
        data-inertia="og:description"
        property="og:description"
        content="{{ $seo['description'] }}"
    />
    <meta
        data-inertia="og:site_name"
        property="og:site_name"
        content="Mapping Solutions"
    />
    <meta
        data-inertia="og:locale"
        property="og:locale"
        content="{{ ['en' => 'en_GB', 'ar' => 'ar_AR', 'fr' => 'fr_FR'][$seo['locale']] ?? $seo['locale'] }}"
    />
    @foreach (array_keys($seo['alternates']) as $locale)
        @if ($locale !== $seo['locale'] && $locale !== 'x-default')
            <meta
                data-inertia="og:locale:alternate-{{ $locale }}"
                property="og:locale:alternate"
                content="{{ ['en' => 'en_GB', 'ar' => 'ar_AR', 'fr' => 'fr_FR'][$locale] ?? $locale }}"
            />
        @endif
    @endforeach
    <meta
        data-inertia="og:image"
        property="og:image"
        content="{{ $seo['image'] }}"
    />
    <meta
        data-inertia="og:image:alt"
        property="og:image:alt"
        content="{{ $seo['imageAlt'] }}"
    />
    <meta
        data-inertia="twitter:card"
        name="twitter:card"
        content="summary_large_image"
    />
    <meta
        data-inertia="twitter:title"
        name="twitter:title"
        content="{{ $seo['title'] }}"
    />
    <meta
        data-inertia="twitter:description"
        name="twitter:description"
        content="{{ $seo['description'] }}"
    />
    <meta
        data-inertia="twitter:image"
        name="twitter:image"
        content="{{ $seo['image'] }}"
    />
    <meta
        data-inertia="twitter:image:alt"
        name="twitter:image:alt"
        content="{{ $seo['imageAlt'] }}"
    />
    <script data-inertia="structured-data" type="application/ld+json">
        {!! json_encode($seo['structuredData'], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR) !!}
    </script>
@endif
