<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'merchandise_purchased',
        'establishment',
        'installments',
        'value_installment',
        'user_id',
    ];
}
