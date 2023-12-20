<?php

use App\Http\Controllers\AlgoritmaController;
use App\Http\Controllers\Api\ConsumableApiController;
use App\Http\Controllers\NodeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/location_info', [ConsumableApiController::class, 'getLocationInfo']);
Route::get('/djikstra/result/{titikMulai}/{titikTujuan}', [AlgoritmaController::class, 'getDataAlgoritmaDjikstraJson']);
Route::get('/astar/result/{titikMulai}/{titikTujuan}', [AlgoritmaController::class, 'getDataAlgoritmaAstarJson']);
Route::get('/update-node', [AlgoritmaController::class, 'updateNode']);
Route::get('/node/filter/{filter}', [NodeController::class, 'dataFilter']);
Route::get('/node/{id}', [NodeController::class, 'searchData']);
