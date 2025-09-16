<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller {
    public function usersIndex() {
        return response()->json(['users' => User::select('id','username','email','role','created_at')->paginate(20)]);
    }
}