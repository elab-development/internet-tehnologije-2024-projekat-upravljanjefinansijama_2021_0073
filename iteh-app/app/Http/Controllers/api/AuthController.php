<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email'=> 'required|string|max:255|email|unique:users',
            'password'=> 'required|string|min:8',
            ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $user = \App\Models\User::create([
            'username'=> $request->username,
            'email'=> $request->email,
            'password'=> Hash::make($request->password)
        ]);

        $token = $user->createToken('auth token')->plainTextToken;

        return response()->json(['data'=>$user, 'access_token'=>$token, 'token_type'=>'Bearer']);
    }

    public function login(Request $request) {
        if (!Auth::attempt($request->only("email","password"))) {
            return response()->json(['message'=>'Unauthorized'], 401);
        }

        $user = \App\Models\User::where('email', $request->email)->firstOrFail();

        $token = $user->createToken('auth token')->plainTextToken;

        return response()->json(['message'=>'Uspesna prijava! Zdravo ' . $user->username . '!', 'access_token'=>$token, 'token_type'=>'Bearer']);
    }
}
