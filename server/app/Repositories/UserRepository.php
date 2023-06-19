<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserRepository 
{
    // Save a new User in the database
    public static function create(array $args){
        return DB::transaction(function () use ($args){
            $hash = password_hash($args['user']['password'], PASSWORD_BCRYPT);
            $newUser = User::create([
                "name" => $args['user']['name'],
                "email" => $args['user']['email'],
                "cpf" => $args['user']['cpf'],
                "address" => $args['user']['address'],
                "password" => $hash,
                "phone" => $args['user']['phone'],
            ]);

            return $newUser;
        });
    }

    // Search the database for an user
    public static function getUser(string $email){
        $user = User::whereEmail($email)->first();
        return $user;
    }
}