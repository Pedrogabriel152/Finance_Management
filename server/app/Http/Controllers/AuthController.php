<?php

namespace App\Http\Controllers;

use DateTime;
use Illuminate\Http\Request;
use App\Services\TokenService;
use App\Repositories\UserRepository;
use ErrorException;

class AuthController extends Controller
{
    private UserRepository $userRepository_;

    public function __construct()
    {
        $this->userRepository_ = new UserRepository();
    }


    public function login(Request $request){
        try {
            $userExist = $this->userRepository_->getUser($request->email);
        
            if(!$userExist) throw new ErrorException("E-mail ou senha incorreto", 403);

            if(!password_verify($request->password, $userExist->password)) throw new ErrorException("E-mail ou senha incorreto", 403);
            
            $token = TokenService::createToken($userExist, 8);

            return response()->json([
                'code' => 200,
                'message' => "Bem vindo de volta",
                "token" => $token,
                'user_id' => $userExist->id
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], $th->getCode());
        }
    }

    public function register(Request $request) {
        try {
            if(strlen($request->phone) !== 11) throw new ErrorException("O campo celular tem que tem 11 digitos", 402);

            if(strlen($request->cpf) !== 11) throw new ErrorException("O campo CPF tem que tem 11 digitos", 402);

            $newUser = $this->userRepository_->create($request);

            if(!$newUser) throw new ErrorException("Falha ao cadastrar usuário", 500);

            $token = TokenService::createToken($newUser, 8);

            return response()->json([
                "code" => 200,
                "message" => "Usuário cadastrado com sucesso",
                "token" => $token,
                'user_id' => $newUser->id
            ], 200);

        } catch (\Throwable $th) {
            return response()->json(["message" => $th->getMessage()], $th->getCode()? $th->getCode() : 500);
        }
    }
}
