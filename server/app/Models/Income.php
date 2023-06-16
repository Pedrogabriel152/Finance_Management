<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Income extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'establishment',
        'installments',
        'value_installment',
        'expires',
        'installments_received',
        'received_income',
        'user_id',
    ];
}
