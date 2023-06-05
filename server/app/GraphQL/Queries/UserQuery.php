<?php

namespace App\GraphQL\Queries;

use App\Services\UserService;

final class UserQuery
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // $user = User::where('email', $request->email)->first();
 
        // if (! $user || ! Hash::check($request->password, $user->password)) {
        //     throw ValidationException::withMessages([
        //         'email' => ['The provided credentials are incorrect.'],
        //     ]);
        // }
    
        // return $user->createToken($request->device_name)->plainTextToken;
    }

    // public function getUser($_, array $args){
    //     $response = UserService::getUserById($args['id']);
    //     return $response;
    // }

    public function login($_, array $args){
        $response = UserService::login($args);
        return $response;
    }
}
