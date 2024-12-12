<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class PasswordResetController extends Controller
{
    public function forgotPassword(Request $request) {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );
    
        switch ($status) {
            case Password::RESET_LINK_SENT:
                return response()->json([
                    'status'        => 'success',
                    'message' => 'Password reset link send into mail.',
                    'data' =>''], 201);
            case Password::INVALID_USER:
                return response()->json([
                    'status'        => 'failed',
                    'message' =>   'Unable to send password reset link.'
                ], 401);
        }  
    }

    public function resetPassword(Request $request) {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);
     
        $status = Password::reset(
            $request->only('email', 'password', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));
     
                $user->save();
     
                event(new PasswordReset($user));
            }
        );
     
        if ($status == Password::PASSWORD_RESET) {
            return response([
                'message'=> 'Password reseted successfully'
            ], 201);
        }

        return response([
            'message'=> __($status)
        ], 500);
    }
}
