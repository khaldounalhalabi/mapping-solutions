<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SetLocaleController;
use App\Http\Middleware\AcceptedLanguagesMiddleware;

Route::post('/locale', [SetLocaleController::class, 'setLanguage'])->middleware('web')->withoutMiddleware([AcceptedLanguagesMiddleware::class])->name('set-locale');
