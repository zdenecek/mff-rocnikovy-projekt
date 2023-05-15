<?php

use App\Http\Controllers\PlayerController;
use App\Http\Controllers\TournamentController;
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


Route::get('/', function () {
    return view('welcome');
});

Route::get('/tournaments', [TournamentController::class , 'index']);
Route::get('/tournaments/{tournament}', [TournamentController::class , 'show']);
Route::post('/tournaments', [TournamentController::class , 'store']);
Route::put('/tournaments/{tournament}', [TournamentController::class , 'update']);
Route::delete('/tournaments/{tournament}', [TournamentController::class , 'destroy']);

Route::get('/players', [PlayerController::class , 'index']);
