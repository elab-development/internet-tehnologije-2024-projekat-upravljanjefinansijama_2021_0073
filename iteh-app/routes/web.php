<?php

use App\Http\Controllers\MailController;
use Illuminate\Support\Facades\Route;

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
    return view('welcome');
});

Route::get('/reset-password', function () {
    $token = request('token');
    $email = request('email'); 
    $url = "http://localhost:3000/reset-password/{$token}";
    if ($email) {
        $url .= "?email={$email}";
    }
    return redirect()->away($url);
});



