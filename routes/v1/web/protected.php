<?php

use App\Http\Controllers\WEB\v1;
use Illuminate\Support\Facades\Route;

Route::get('/v1/dashboard/me', [v1\BaseAuthController::class, 'userDetails'])->name('v1.web.protected.me');
Route::put('/v1/dashboard/me', [v1\BaseAuthController::class, 'updateUserDetails'])->name('v1.web.protected.me.update');
Route::get('/v1/dashboard/logout', [v1\BaseAuthController::class, 'logout'])->name('v1.web.protected.logout');

Route::inertia('/v1/dashboard/', 'index')->name('v1.web.protected.index');

Route::get('/v1/suppliers/data', [v1\SupplierController::class, 'data'])->name('v1.web.protected.suppliers.data');
Route::resource('/v1/suppliers', v1\SupplierController::class)->names('v1.web.protected.suppliers');

Route::get('/v1/product-families/data', [v1\ProductFamilyController::class, 'data'])->name('v1.web.protected.product.families.data');
Route::resource('/v1/product-families', v1\ProductFamilyController::class)->names('v1.web.protected.product.families');

Route::get('/v1/product-technologies/data', [v1\ProductTechnologyController::class, 'data'])->name('v1.web.protected.product.technologies.data');
Route::resource('/v1/product-technologies', v1\ProductTechnologyController::class)->names('v1.web.protected.product.technologies');

Route::get('/v1/products/data', [v1\ProductController::class, 'data'])->name('v1.web.protected.products.data');
Route::resource('/v1/products', v1\ProductController::class)->names('v1.web.protected.products');

Route::get('/v1/market-applications/data', [v1\MarketApplicationController::class, 'data'])->name('v1.web.protected.market.applications.data');
Route::resource('/v1/market-applications', v1\MarketApplicationController::class)->names('v1.web.protected.market.applications');

Route::get('/v1/services/data', [v1\ServiceController::class, 'data'])->name('v1.web.protected.services.data');
Route::resource('/v1/services', v1\ServiceController::class)->names('v1.web.protected.services');

Route::get('/v1/news-categories/data', [v1\NewsCategoryController::class, 'data'])->name('v1.web.protected.news.categories.data');
Route::resource('/v1/news-categories', v1\NewsCategoryController::class)->names('v1.web.protected.news.categories');

Route::get('/v1/news-articles/data', [v1\NewsArticleController::class, 'data'])->name('v1.web.protected.news.articles.data');
Route::resource('/v1/news-articles', v1\NewsArticleController::class)->names('v1.web.protected.news.articles');
