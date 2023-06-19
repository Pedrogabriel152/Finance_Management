<?php

namespace App\GraphQL\Mutations;

use App\Services\UserService;

final class UserMutation
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    // Create new User
    public function createUser($_, array $args){
        $response = UserService::createUser($args);
        return $response;        
    }
}
