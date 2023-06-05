<?php

namespace App\GraphQL\Queries;

use App\Services\JobService;

final class JobQuery
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    public function getJobs($_, array $args){
        $response = JobService::getJobs($args['user_id']);
        return $response;
    }

    public function getJob($_, array $args){
        $response = JobService::getJob($args);
        return $response;
    }
}
