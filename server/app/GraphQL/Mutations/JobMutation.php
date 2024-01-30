<?php

namespace App\GraphQL\Mutations;

use App\Services\JobService;

final class JobMutation
{
    private JobService $jobService_;
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
        $this->jobService_ = new JobService();
    }

    // Create new Job
    public function createJob($_, array $args)
    {
        $response = $this->jobService_->createJob($args);
        return $response;
    }

    // Update Job
    public function updateJob($_, array $args)
    {
        $response = $this->jobService_->updateJob($args);
        return $response;
    }

    // Delete Job
    public function deleteJob($_, array $args)
    {
        $response = $this->jobService_->deleteJob($args['id'], $args['user_id']);
        return $response;
    }
}
