<?php

namespace App\GraphQL\Mutations;

use DateTime;
use App\Services\UserService;
use App\Repositories\UserRepository;

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

    public function createUser($_, array $args){
        $response = UserService::createUser($args);
        return $response;        
    }
}
