<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SetLocaleController;

Route::post('/locale', [SetLocaleController::class, 'setLanguage'])->middleware(['web', 'throttle:30,1,locale'])->name('set-locale');
