<?php

namespace App\GraphQL\Queries;

use App\Services\UserService;

final class UserQuery
{
    private UserService $userService_;
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    public function __construct()
    {
        $this->userService_ = new UserService();
    }

    // Login for an User
    public function login($_, array $args){
        $response = $this->userService_->login($args);
        return $response;
    }
}
