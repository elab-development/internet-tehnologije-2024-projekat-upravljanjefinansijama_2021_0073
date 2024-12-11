<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Budget extends Model
{
    use HasFactory;

    protected $fillable = [
        'category',
        'limit',
        'start_date',
        'end_date',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function expenses() {
        return $this->hasMany(Expense::class);
    }

    public function incomes() {
        return $this->hasMany(Income::class);
    }

}
