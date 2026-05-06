<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\ApiController;

Route::get('/test', [ApiController::class, 'index']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/videos', [VideoController::class, 'index']);
Route::get('/videos/{id}', [VideoController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/videos', [VideoController::class, 'store']);
    Route::put('/videos/{id}', [VideoController::class, 'update']);
    Route::delete('/videos/{id}', [VideoController::class, 'destroy']);

    Route::post('/videos/{videoId}/like', [LikeController::class, 'store']);
    Route::delete('/videos/{videoId}/like', [LikeController::class, 'destroy']);

    Route::post('/channels/{channelId}/subscribe', [SubscriptionController::class, 'store']);
    Route::delete('/channels/{channelId}/subscribe', [SubscriptionController::class, 'destroy']);
});
