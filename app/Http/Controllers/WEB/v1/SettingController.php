<?php

namespace App\Http\Controllers\WEB\v1;

use Inertia\Inertia;
use App\Http\Controllers\WebController;
use App\Modules\Settings\App\Services\SettingService;
use App\Modules\Settings\App\Resources\SettingResource;
use App\Modules\Settings\App\Requests\UpdateSettingRequest;

class SettingController extends WebController
{
    private SettingService $service;

    public function __construct()
    {
        $this->service = SettingService::make();
    }

    public function edit($settingId)
    {
        $setting = $this->service->find($settingId);
        if (! $setting) {
            abort(404);
        }

        return Inertia::render('dashboard/settings/edit', [
            'setting' => SettingResource::make($setting),
        ]);
    }

    public function index()
    {
        $settings = $this->service->all();

        return Inertia::render('dashboard/settings/index', [
            'settings' => SettingResource::collection($settings),
        ]);
    }

    public function update($settingId, UpdateSettingRequest $request)
    {
        $setting = $this->service->update($settingId, $request->validated('value'));
        if (! $setting) {
            abort(404);
        }

        return redirect()->route('v1.web.protected.settings.index')
            ->with('success', trans('site.update_successfully'));
    }
}
