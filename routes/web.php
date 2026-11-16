<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RobotsController;
use App\Http\Controllers\SetLocaleController;
use App\Http\Controllers\WEB\v1\NewsletterSubscriberController;

Route::get('/robots.txt', RobotsController::class)->name('robots');

Route::post('/locale', [SetLocaleController::class, 'setLanguage'])->middleware(['web', 'throttle:30,1,locale'])->name('set-locale');

Route::get('/v1/newsletter/unsubscribe/{newsletterSubscriberId}', [NewsletterSubscriberController::class, 'unsubscribe'])
    ->middleware('signed')
    ->name('v1.web.public.newsletter.unsubscribe');
