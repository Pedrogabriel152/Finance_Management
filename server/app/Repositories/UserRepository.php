<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class UserRepository 
{
    // Save a new User in the database
    public static function create(Request $request){
        return DB::transaction(function () use ($request){
            $hash = password_hash($request->password, PASSWORD_BCRYPT);
            $newUser = User::create([
                "name" => $request->name,
                "email" => $request->email,
                "cpf" => $request->cpf,
                "address" => $request->address,
                "password" => $hash,
                "phone" => $request->phone,
            ]);

            return $newUser;
        });
    }

    // Search the database for an user
    public static function getUser(string $email){
        $user = User::whereEmail($email)->first();
        return $user;
    }

    public static function editUser(object $user, array $editUser){
        return DB::transaction(function () use ($editUser, $user){
            $user->name = $editUser['name'];
            $user->email = $editUser['email'];
            $user->cpf = $editUser['cpf'];
            $user->phone = $editUser['phone'];
            $user->address = $editUser['address'];

            if(array_key_exists('password', $editUser)){
                $user->password = password_hash($editUser['password'], PASSWORD_BCRYPT);
            }
            
            $user->save();
            return $user;
        });
    }

    public static function getUserById(int $id){
        $user = User::find($id);
        return $user;
    }
}