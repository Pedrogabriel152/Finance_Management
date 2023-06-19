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

    // Search for an Jobs
    public function getJobs($_, array $args){
        $response = JobService::getJobs($args['user_id']);
        return $response;
    }

    // Search for an Job
    public function getJob($_, array $args){
        $response = JobService::getJob($args);
        return $response;
    }

    // Update Job
    public function updateJob($_, array $args){
        
    }
}
