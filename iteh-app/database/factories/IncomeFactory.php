<?php

namespace Database\Factories;

use App\Models\Budget;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Income>
 */
class IncomeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'amount'=>$this->faker->randomFloat(2,10,10000),
            'source'=>$this->faker->randomElement(['Plata','Bonus','Investicije','Od roditelja','Freelance']),
            'date'=>$this->faker->dateTimeBetween('2025-01-01', '2025-07-18'),
            'budget_id'=>Budget::factory()
        ];
    }
}
