<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Budget;
use App\Models\Income;
use App\Models\Expense;
use App\Models\User;
use Illuminate\Database\Seeder;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(AdminUserSeeder::class);
        $user = User::factory()->create();

        $budgets = Budget::factory(3)->create([
            "user_id"=> $user->id,
        ]);

        foreach ($budgets as $budget) {
            Income::factory(2)->create([
                'budget_id' => $budget->id,
            ]);

            Expense::factory(3)->create([
                'budget_id' => $budget->id,
            ]);
        }

    }
}
