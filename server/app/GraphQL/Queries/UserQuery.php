<?php

namespace App\GraphQL\Queries;

use App\Services\UserService;

final class UserQuery
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    // public function __invoke($_, array $args)
    // {
    // }

    // Login for an User
    public function login($_, array $args){
        $response = UserService::login($args);
        return $response;
    }
}
