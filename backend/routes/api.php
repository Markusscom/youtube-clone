<?php
use Illuminate\Support\Facades\Route;

Route::get('/test', [\App\Http\Controllers\ApiController::class, 'index']);
