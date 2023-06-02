<?php

namespace App\Services;

use DateTime;
use App\Repositories\UserRepository;

class UserService{
    public static function createUser(array $args){
        try {
            $newUser = UserRepository::create($args);
            // dd($newUser);

            if(!$newUser){
                return [
                    "code" => 500,
                    "message" => "Falha ao cadastrar usuário",
                ];
            }

            $futureDate = strtotime("2 hours");
            $expirationDate = new DateTime(date('Y-m-d H:i',$futureDate));

            $token = $newUser->createToken('Token',["*"], $expirationDate);

            return [
                "code" => 200,
                "message" => "Usuário cadastrado com sucesso",
                "token" => $token->plainTextToken,
                'user_id' => $newUser->id
            ];

        } catch (\Throwable $th) {
            return [
                "code" => 500,
                "message" => "Falha ao cadastrar usuário",
            ];
        }
    }
}