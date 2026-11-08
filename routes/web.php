<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SetLocaleController;
use App\Http\Middleware\AcceptedLanguagesMiddleware;

Route::post('/locale', [SetLocaleController::class, 'setLanguage'])->middleware(['web', 'throttle:30,1,locale'])->withoutMiddleware([AcceptedLanguagesMiddleware::class])->name('set-locale');
