<?php

namespace App\Modules\Settings\App\Requests;

use Illuminate\Validation\Rule;
use App\Modules\Settings\App\Config;
use Illuminate\Foundation\Http\FormRequest;
use App\Modules\Settings\App\Services\SettingService;

class UpdateSettingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, Rule|array|string>
     */
    public function rules(): array
    {
        $setting = SettingService::make()->find($this->route(Config::idRouteParam()));

        return [
            'value' => $setting?->getValidationRulesBasedOnType() ?? 'required|string|max:255',
        ];
    }
}
