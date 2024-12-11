<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\PasswordResetController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class,'login']);

Route::post('/forgot-password', [PasswordResetController::class, 'forgotPassword'])->middleware('guest')->name('password.email');
Route::post('/reset-password', [PasswordResetController::class,'resetPassword'])->middleware('guest')->name('password.update');



Route::group(['middleware'=>['auth:sanctum']], function () {
    Route::get('/profile', function(Request $request) {
        return auth()->user();
    });

    Route::resource('/budgets',BudgetController::class);
    Route::resource('budgets.incomes',IncomeController::class);
    Route::resource('budgets.expenses',ExpenseController::class);

    Route::get('/expenses/filter', [ExpenseController::class, "indexFilter"]);

    Route::post('/logout', [AuthController::class,'logout']);
});
