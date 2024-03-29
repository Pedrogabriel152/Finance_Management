<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Job extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'description',
        'wage',
        'establishment',
        'user_id',
        'active',
        'started',
        'leave'
    ];
}
