<!DOCTYPE html>
<html
    lang="{{ str_replace("_", "-", app()->getLocale()) }}"
    dir="{{ app()->getLocale() == "ar" ? "rtl" : "ltr" }}"
>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite (["resources/js/cubeta-starter.tsx"])
    <x-inertia::head>
        <title>{{ config('app.name') }}</title>
    </x-inertia::head>

    <link rel="icon" href="{{asset("/favicon.ico")}}" sizes="any" />
    <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="{{asset("/favicon-32x32.png")}}"
    />
    <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="{{asset("/favicon-16x16.png")}}"
    />
    <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="{{asset("/apple-touch-icon.png")}}"
    />
    <link rel="manifest" href="{{asset("/site.webmanifest")}}" />
    <meta name="theme-color" content="#442575" />
</head>

<body>
    <x-inertia::app />
</body>
</html>
