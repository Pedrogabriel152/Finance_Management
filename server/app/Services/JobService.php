<?php

namespace App\Services;

use ErrorException;
use App\Repositories\JobRepository;

class JobService
{
    private JobRepository $jobRepository_;

    public function __construct()
    {
        $this->jobRepository_ = new JobRepository();
    }

    // Job creation service
    public function createJob(array $args){
        try {
            $newJob = $this->jobRepository_->create($args);
            
            if(!$newJob) throw new ErrorException('Falha ao criar o trablaho!', 500);

            return [
                'code' => 200,
                'message' => "Trabalho criado com sucesso!",
                'job' => $newJob 
             ];

        } catch (\Throwable $th) {
            return [
                'code' => $th->getCode(),
                'message' => $th->getMessage()
            ];
        }
        
    }

    // Search service an jobs
    public function getJobs(int $id){
        $jobs = $this->jobRepository_->getJobs($id);
        return $jobs? $jobs : [];
    }

    // Search service an job
    public function getJob(array $args){
        $job = $this->jobRepository_->getJob($args['id'], $args['user_id']);
        return $job;
    }

    // Search service an five Jobs
    public function getFiveJobs(int $user_id) {
        $jobs = $this->jobRepository_->getFiveJobs($user_id);
        return $jobs? $jobs: [];
    }

    // Job update service
    public function updateJob(array $args){
        try {
            $jobExist = $this->jobRepository_->getJob($args['id'], $args['user_id']);
            
            if(!$jobExist) throw new ErrorException('Trabalho não encontrado!', 404);

            $this->jobRepository_->updateJob($args['job'], $jobExist);

            return [
                'code' => 200,
                'message' => "Trabalho editado com sucesso!",
                'job' => $jobExist 
             ];

        } catch (\Throwable $th) {
            return [
                'code' => $th->getCode(),
                'message' => $th->getMessage()
            ];
        }
    }

    // Job deletion service
    public function deleteJob(int $id, int $user_id){
        try {
            $jobExist = $this->jobRepository_->getJob($id, $user_id);

            if(!$jobExist) throw new ErrorException('Trabalho não encontrado!', 404);

            $this->jobRepository_->updateActiviJob($jobExist);

            return [
                'code' => 200,
                'message' => "Trabalho deletado com!" 
            ];
        } catch (\Throwable $th) {
            return [
                'code' => $th->getCode(),
                'message' => $th->getMessage()
            ];
        }
    }

    public function getActiveJobs(int $user_id){
        $activeJobs = $this->jobRepository_->getActiveJobs($user_id);
        return $activeJobs? $activeJobs : [];
    }

    public function getIdleJobs(int $user_id) {
        $idleJobs = $this->jobRepository_->getIdleJobs($user_id);
        return $idleJobs? $idleJobs : [];
    }
}