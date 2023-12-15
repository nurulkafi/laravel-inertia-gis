<?php

use App\Http\Controllers\AlgoritmaController;
use App\Http\Controllers\Api\ConsumableApiController;
use App\Http\Controllers\GraphController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\NodeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('/node', [NodeController::class, 'index'])->name('node.index');
    Route::post('/node', [NodeController::class, 'create'])->name('node.create');
    Route::get('/graph', [GraphController::class, 'index'])->name('graph.index');
    Route::get('/add-graph', [GraphController::class, 'add'])->name('graph.add');
    Route::post('/graph', [GraphController::class, 'create'])->name('graph.create');
    Route::get('/algoritma/djikstra', [AlgoritmaController::class, 'index'])->name('algoritma.index');
    Route::get('/algoritma/astar', [AlgoritmaController::class, 'indexAstar']);
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::get('/test', [AlgoritmaController::class, 'test'])->name('algoritma.test');
Route::get('/generate-node', [ConsumableApiController::class, 'generateNode']);
Route::get('/test', [ConsumableApiController::class, 'Testing']);
Route::get('/update-node', [AlgoritmaController::class, 'updateNode']);
Route::get('/landing-page', [LandingPageController::class, 'index']);
Route::get('/laporan', [LandingPageController::class, 'laporkan']);
require __DIR__.'/auth.php';
