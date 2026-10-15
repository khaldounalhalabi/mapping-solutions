<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Psr\Container\NotFoundExceptionInterface;
use Psr\Container\ContainerExceptionInterface;
use Illuminate\Http\Resources\Json\JsonResource;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     *
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    public function share(Request $request): array
    {
        JsonResource::withoutWrapping();

        return array_merge(parent::share($request), [
            'availableLocales' => config('cubeta-starter.available_locales'),
            'currentLocale' => Session::get('locale') ?? 'en',
            'authUser' => auth()->user(),
            'asset' => asset('/'),
            'baseUrl' => (config('cubeta-starter.project_url') ?? config('app.url')) ?? '/',
            'error' => session()->get('error') ?? null,
            'success' => session()->get('success') ?? null,
        ]);
    }

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }
}
