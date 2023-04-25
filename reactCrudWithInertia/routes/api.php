<?php

use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::post('update/cart', [ProductController::class, 'createCart']);

Route::post('update/cart/{cart}', [ProductController::class, 'updateCart']);
