<?php

namespace App\Services;

use DateTime;
use App\Repositories\UserRepository;

class UserService{
    // User creation service
    public static function createUser(array $args){
        try {

            if(strlen($args['user']['phone']) !== 11){
                return [
                    "code" => 402,
                    "message" => "O campo celular tem que tem 11 digitos",
                ];
            }

            if(strlen($args['user']['cpf']) !== 11){
                return [
                    "code" => 402,
                    "message" => "O campo CPF tem que tem 11 digitos",
                ];
            }

            $newUser = UserRepository::create($args);
            // dd($newUser);

            if(!$newUser){
                return [
                    "code" => 500,
                    "message" => "Falha ao cadastrar usuário",
                ];
            }

            $futureDate = strtotime("8 hours");
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

    // Login service
    public static function login(array $args){
        $userExist = UserRepository::getUser($args['email']);
        
        if(!$userExist){
            return [
                "code" => 404,
                "message" => "E-mail ou senha incorreto",
            ];
        }

        if(!password_verify($args['password'], $userExist->password)){
            return [
                "code" => 404,
                "message" => "E-mail ou senha incorreto",
            ];
        }
        
        $token = TokenService::createToken($userExist);

        return [
            "code" => 200,
            "message" => "Usuário logado com sucesso",
            "token" => $token,
            'user_id' => $userExist->id
        ];
    }
}