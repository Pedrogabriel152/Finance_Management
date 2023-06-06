<?php

namespace App\GraphQL\Mutations;

use App\Services\JobService;

final class JobMutation
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    public static function createJob($_, array $args)
    {
        $response = JobService::createJob($args);
        return $response;
    }

    public static function updateJob($_, array $args)
    {
        $response = JobService::updateJob($args);
        return $response;
    }
}
