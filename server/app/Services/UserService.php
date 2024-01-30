<?php

namespace App\Services;

use App\Models\User;
use DateTime;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class UserService{

    private UserRepository $userRepository_;

    public function __construct()
    {
        $this->userRepository_ = new UserRepository();
    }

    // User creation service
    public function createUser(Request $args){
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

            $newUser = $this->userRepository_->create($args);

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
    public function login(array $args){
        $userExist = $this->userRepository_->getUser($args['email']);
        
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
        
        $token = TokenService::createToken($userExist, 8);

        return [
            "code" => 200,
            "message" => "Usuário logado com sucesso",
            "token" => $token,
            'user_id' => $userExist->id
        ];
    }

    public function editUser(array $args){
        $user = $this->userRepository_->getUserById($args['id']);

        if(!$user) {
            return [
                'code' => 404,
                'message' => "Usuário não encontrado"
            ];
        }

        $updateUser = $this->userRepository_->editUser($user, $args['user']);

        if(!$updateUser) {
            return [
                'code' => 500,
                'message' => "Erro ao atualizar usuário"
            ];
        }

        return [
            'code' => 200,
            'message' => 'Usuário atualizado com sucesso'
        ];
    }
}