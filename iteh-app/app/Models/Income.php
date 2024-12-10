<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Income extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',
        'source',
        'date',
        'budget_id'
    ];

    public function budget() {
        return $this->belongsTo(Budget::class);
    }
}
