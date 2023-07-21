<?php

namespace App\Http\Controllers;

use DateTime;
use Illuminate\Http\Request;
use App\Services\TokenService;
use App\Repositories\UserRepository;

class AuthController extends Controller
{
    public function login(Request $request){
        $userExist = UserRepository::getUser($request->email);
        
        if(!$userExist){
            return response()->json(['message' => "E-mail ou senha incorreto"], 404);
        }

        if(!password_verify($request->password, $userExist->password)){
            return response()->json(['message' => "E-mail ou senha incorreto"], 404);
        }
        
        $token = TokenService::createToken($userExist);

        return response()->json([
            'code' => 200,
            'message' => "Bem vindo de volta",
            "token" => $token,
            'user_id' => $userExist->id
        ], 200);
    }

    public function register(Request $request) {
        try {
            if(strlen($request->phone) !== 11){
                return response()->json([
                    "code" => 402,
                    "message" => "O campo celular tem que tem 11 digitos",
                ], 402);
            }

            if(strlen($request->cpf) !== 11){
                return response()->json([
                    "code" => 402,
                    "message" => "O campo CPF tem que tem 11 digitos",
                ], 402);
            }

            $newUser = UserRepository::create($request);
            // dd($newUser);

            if(!$newUser){
                return response()->json(["message" => "Falha ao cadastrar usuário"], 500);
            }

            $futureDate = strtotime("8 hours");
            $expirationDate = new DateTime(date('Y-m-d H:i',$futureDate));

            $token = $newUser->createToken('Token',["*"], $expirationDate);

            return response()->json([
                "code" => 200,
                "message" => "Usuário cadastrado com sucesso",
                "token" => $token->plainTextToken,
                'user_id' => $newUser->id
            ], 200);

        } catch (\Throwable $th) {
            return response()->json(["message" => "Falha ao cadastrar usuário"], 500);
        }
    }
}
