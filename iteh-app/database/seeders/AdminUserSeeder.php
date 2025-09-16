<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder {
    public function run(): void {
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            ['username' => 'admin', 'password' => Hash::make('Admin#12345'), 'role' => 'admin']
        );
    }
}