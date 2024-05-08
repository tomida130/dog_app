<?php

use App\Http\Controllers\FavoriteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// お気に入り
Route::get('/favorites',[FavoriteController::class, 'index']);
Route::post('/favorites',[FavoriteController::class, 'toggleFavorite']);
Route::get('/favorites/status',[FavoriteController::class, 'checkFavoriteStatus']);