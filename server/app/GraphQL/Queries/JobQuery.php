<?php

namespace App\GraphQL\Queries;

use App\Services\JobService;

final class JobQuery
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    // public function __invoke($_, array $args)
    // {
    //     // TODO implement the resolver
    // }

    // Search for an Jobs
    public function getJobs($_, array $args)
    {
        $response = JobService::getJobs($args['user_id']);
        return $response;
    }

    // Search for an Job
    public function getJob($_, array $args)
    {
        $response = JobService::getJob($args);
        return $response;
    }

    // Search for an five Jobs
    public function getFiveJobs($_, array $args)
    {
        $response = JobService::getFiveJobs($args['user_id']);
        return $response;
    }

    // Update Job
    public function updateJob($_, array $args){
        
    }

    public function getActiveJobs($_, array $args)
    {
        $response = JobService::getActiveJobs($args['user_id']);
        return $response;
    }

    public function getIdleJobs($_, array $args)
    {
        $response = JobService::getIdleJobs($args['user_id']);
        return $response;
    }
}
