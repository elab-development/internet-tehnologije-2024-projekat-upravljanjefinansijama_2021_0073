<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\PasswordResetController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ExchangeController;
use App\Http\Controllers\ReceiptController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\CryptoController;

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

Route::post('/login', [AuthController::class,'login'])->middleware('throttle:auth');;

Route::post('/forgot-password', [PasswordResetController::class, 'forgotPassword'])->middleware('guest')->name('password.email');
Route::post('/reset-password', [PasswordResetController::class,'resetPassword'])->middleware('guest')->name('password.update');


Route::get('/crypto/prices', [CryptoController::class, 'prices'])->middleware('throttle:public-apis');
Route::get('/exchange/convert', [ExchangeController::class, 'convert'])->middleware('throttle:public-apis');

Route::group(['middleware'=>['auth:sanctum']], function () {
    // ADMIN
    Route::middleware('admin')->group(function () {
        Route::get('/admin/users', [AdminController::class, 'usersIndex']);
        
    });

    Route::get('/profile', function (Request $request) {
        $user = auth()->user();
        return response()->json([
            'username' => $user->username,
            'email' => $user->email,
            'role' => $user->role,
            'created_at' => $user->created_at->format('Y-m-d H:i:s'),
        ]);
    });

    // Reports & Exchange
    Route::get('/reports/summary', [ReportController::class, 'summary']);
    //Route::get('/exchange/convert', [ExchangeController::class, 'convert'])->middleware('throttle:public-apis');

    // Budgets, incomes, expenses
    Route::resource('/budgets',BudgetController::class);
    Route::resource('budgets.incomes',IncomeController::class);
    Route::resource('budgets.expenses',ExpenseController::class);

    Route::get('/expenses/filter', [ExpenseController::class, "indexFilter"]);

    Route::get('/savings', [BudgetController::class, 'calculateSavings']);
    Route::get('/expenses/max-category', [BudgetController::class,'getMaxExpenseCategory']);

    // Receipts
    Route::get('/expenses/{expense}/receipts', [ReceiptController::class, 'index']);
    Route::post('/expenses/{expense}/receipts', [ReceiptController::class, 'store']);
    Route::delete('/receipts/{id}', [ReceiptController::class, 'destroy']);

    // Exports
    Route::get('/exports/expenses.csv', [ExportController::class, 'expensesCsv']);
    Route::get('/exports/report.pdf',   [ExportController::class, 'reportPdf']);

    // Crypto
    //Route::get('/crypto/prices', [CryptoController::class, 'prices'])->middleware('throttle:public-apis');

    Route::post('/logout', [AuthController::class,'logout']);
});
