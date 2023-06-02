<?php

namespace App\GraphQL\Queries;

use App\Repositories\UserRepository;
use App\Services\UserService;

final class UserQuery
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    public function getUser($_, array $args){
        $response = UserService::getUserById($args['id']);
        return $response;
    }
}
