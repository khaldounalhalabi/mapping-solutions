<?php

use App\Http\Controllers\WEB\v1;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\v1\WEB\SiteController;

Route::post('/v1/dashboard/login', [v1\BaseAuthController::class, 'login'])->name('v1.web.public.login');
Route::post('/v1/dashboard/request-reset-password', [v1\BaseAuthController::class, 'requestResetPassword'])->name('v1.web.public.request.reset.password');
Route::post('/v1/dashboard/reset-password', [v1\BaseAuthController::class, 'resetPassword'])->name('v1.web.public.reset.password');
Route::post('/v1/dashboard/validate-reset-password-code', [v1\BaseAuthController::class, 'validateResetPasswordCode'])->name('v1.web.public.validate.reset.password.code');

Route::get('/v1/newsletter/unsubscribe/{newsletterSubscriber}', v1\NewsletterUnsubscribeController::class)
    ->middleware('signed')
    ->name('v1.web.public.newsletter.unsubscribe');

Route::inertia('/v1/dashboard/login', 'dashboard/login')->name('v1.web.public.login.page');
Route::inertia('/v1/dashboard/request-reset-password', 'dashboard/forget-password')->name('v1.web.public.request.reset.password.page');
Route::inertia('/v1/dashboard/reset-password', 'dashboard/reset-password')->name('v1.web.public.reset.password.page');

Route::get('/', [SiteController::class, 'index'])->name('site.index');
Route::get('/products', [SiteController::class, 'products'])->name('site.products');
Route::get('/suppliers', [SiteController::class, 'suppliers'])->name('site.suppliers');
Route::get('/services', [SiteController::class, 'services'])->name('site.services');
Route::get('/news', [SiteController::class, 'newsArticles'])->name('site.news');
Route::get('/about', [SiteController::class, 'about'])->name('site.about');

Route::get('/suppliers/data', [v1\SupplierController::class, 'data'])->name('suppliers.data');

Route::get('/careers', [SiteController::class, 'careers'])->name('site.careers');
Route::get('/vacancy/{slug}', [SiteController::class, 'vacancy'])->name('site.vacancy');
Route::get('/contact', [SiteController::class, 'contact'])->name('site.contact');
Route::get('/applications', [SiteController::class, 'applications'])->name('site.applications');
Route::post('/contact', [SiteController::class, 'storeInquiry'])->middleware('throttle:5,1,contact')->name('site.contact.store');
Route::post('/careers/apply', [SiteController::class, 'storeJobApplication'])->middleware('throttle:5,1,careers')->name('site.careers.apply');
