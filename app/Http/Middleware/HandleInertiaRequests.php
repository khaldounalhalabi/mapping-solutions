<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Psr\Container\NotFoundExceptionInterface;
use Psr\Container\ContainerExceptionInterface;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Modules\Settings\App\Services\SettingService;
use App\Modules\Settings\App\Resources\SettingResource;

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
            'availableLocales'    => config('cubeta-starter.available_locales'),
            'currentLocale'       => app()->getLocale(),
            'formProtectionToken' => fn (): string => Crypt::encryptString(json_encode([
                'issued_at' => now()->timestamp,
                'session'   => hash('sha256', $request->session()->getId()),
            ], JSON_THROW_ON_ERROR)),
            'authUser' => auth()->user(),
            'asset'    => asset('/'),
            'baseUrl'  => (config('cubeta-starter.project_url') ?? config('app.url')) ?? '/',
            'error'    => session()->get('error') ?? null,
            'success'  => session()->get('success') ?? null,
            'settings' => SettingResource::collection(SettingService::make()->all()),
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
