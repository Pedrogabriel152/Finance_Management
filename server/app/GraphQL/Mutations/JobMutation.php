<?php

namespace App\GraphQL\Mutations;

use App\Services\JobService;

final class JobMutation
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    // public function __invoke($_, array $args)
    // {
    //     // TODO implement the resolver
    // }

    // Create new Job
    public static function createJob($_, array $args)
    {
        $response = JobService::createJob($args);
        return $response;
    }

    // Update Job
    public static function updateJob($_, array $args)
    {
        $response = JobService::updateJob($args);
        return $response;
    }

    // Delete Job
    public function deleteJob($_, array $args)
    {
        $response = JobService::deleteJob($args['id'], $args['user_id']);
        return $response;
    }
}
