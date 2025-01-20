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
    Route::get('/profile', function (Request $request) {
        $user = auth()->user();
        return response()->json([
            'username' => $user->username,
            'email' => $user->email,
            'created_at' => $user->created_at->format('Y-m-d H:i:s'),
        ]);
    });

    Route::resource('/budgets',BudgetController::class);
    Route::resource('budgets.incomes',IncomeController::class);
    Route::resource('budgets.expenses',ExpenseController::class);

    Route::get('/expenses/filter', [ExpenseController::class, "indexFilter"]);

    Route::get('/savings', [BudgetController::class, 'calculateSavings']);
    Route::get('/expenses/max-category', [BudgetController::class,'getMaxExpenseCategory']);

    Route::post('/logout', [AuthController::class,'logout']);
});
