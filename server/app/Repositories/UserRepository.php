<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserRepository {
    public static function create(array $args){
        return DB::transaction(function () use ($args){
            $hash = password_hash($args['user']['password'], PASSWORD_BCRYPT);
            // dd($args['user']);
            $newUser = User::create([
                "name" => $args['user']['name'],
                "email" => $args['user']['email'],
                "cpf" => $args['user']['cpf'],
                "address" => $args['user']['address'],
                "password" => $hash,
                "phone" => $args['user']['phone'],
            ]);

            // dd($newUser);

            return $newUser;
        });
    }
}