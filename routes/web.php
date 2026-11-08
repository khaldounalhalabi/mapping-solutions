<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RobotsController;
use App\Http\Controllers\SetLocaleController;

Route::get('/robots.txt', RobotsController::class)->name('robots');

Route::post('/locale', [SetLocaleController::class, 'setLanguage'])->middleware(['web', 'throttle:30,1,locale'])->name('set-locale');
