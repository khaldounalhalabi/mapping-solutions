<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Http\JsonResponse;

class SetLocaleController extends Controller
{
    public function setLanguage(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'lang' => ['required', 'string', Rule::in(config('cubeta-starter.available_locales'))],
        ]);

        $locale = $validated['lang'];
        session()->put('locale', $locale);
        app()->setLocale($locale);

        return response()->json([
            'status'  => true,
            'code'    => 200,
            'message' => trans('site.success'),
        ])->cookie('locale', $locale, 60 * 24 * 365);
    }
}
