<?php

namespace App\GraphQL\Mutations;

use App\Services\UserService;

final class UserMutation
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

    // Create new User
    // public function createUser($_, array $args){
    //     $response = UserService::createUser($args);
    //     return $response;        
    // }

    public function editUser($_, array $args) 
    {
        $response = $this->userService_->editUser($args);
        return $response;
    }
}
