<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Budget>
 */
class BudgetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'category'=> $this->faker->randomElement(['Hrana','Stanovanje','Odeca','Kuca','Putovanja']),
            'limit'=> $this->faker->randomFloat(2,10,10000),
            'period'=> $this->faker->randomElement(['Mesec dana','Nedelju dana','Jedna godina']),
            'user_id'=> User::factory()
        ];
    }
}
