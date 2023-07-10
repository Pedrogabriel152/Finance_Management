<?php

namespace App\Services;

use App\Repositories\JobRepository;

class JobService
{
    // Job creation service
    public static function createJob(array $args){
        try {
            $newJob = JobRepository::create($args);
            
            if(!$newJob){
                return [
                   'code' => 500,
                   'message' => "Falha ao criar o trablaho!" 
                ];
            }

            return [
                'code' => 200,
                'message' => "Trabalho criado com sucesso!",
                'job' => $newJob 
             ];

        } catch (\Throwable $th) {
            return [
                'code' => 500,
                'message' => "Falha ao criar o trablaho!" 
             ];
        }
        
    }

    // Search service an jobs
    public static function getJobs(int $id){
        $jobs = JobRepository::getJobs($id);
        return $jobs? $jobs : [];
    }

    // Search service an job
    public static function getJob(array $args){
        $job = JobRepository::getJob($args['id'], $args['user_id']);
        return $job;
    }

    // Search service an five Jobs
    public static function getFiveJobs(int $user_id) {
        $jobs = JobRepository::getFiveJobs($user_id);
        
        if(!$jobs) {
            return [];
        }

        return $jobs;
    }

    // Job update service
    public static function updateJob(array $args){
        try {
            $jobExist = JobRepository::getJob($args['id'], $args['user_id']);
            
            if(!$jobExist){
                return [
                    'code' => 404,
                    'message' => 'Trabalho não encontrado!'
                ];
            }

            $jobUpdate = JobRepository::updateJob($args['job'], $jobExist);

            return [
                'code' => 200,
                'message' => "Trabalho editado com sucesso!",
                'job' => $jobUpdate 
             ];

        } catch (\Throwable $th) {
            return [
                'code' => 500,
                'message' => "Erro ao atualizar o trabalho!" 
             ];
        }
    }

    // Job deletion service
    public static function deleteJob(int $id, int $user_id){
        try {
            $jobExist = JobRepository::getJob($id, $user_id);

            if(!$jobExist){
                return [
                    'code' => 404,
                    'message' => "Trabalho não encontrado!" 
                ];
            }

            $jobExist = JobRepository::updateActiviJob($jobExist);

            return [
                'code' => 200,
                'message' => "Trabalho deletado com!" 
            ];
        } catch (\Throwable $th) {
            return [
                'code' => 500,
                'message' => "Erro ao deletar o trabalho!" 
             ];
        }
    }

    public static function getActiveJobs(int $user_id){
        $activeJobs = JobRepository::getActiveJobs($user_id);

        if(!$activeJobs){
            return [];
        }

        return $activeJobs;
    }

    public static function getIdleJobs(int $user_id) {
        $idleJobs = JobRepository::getIdleJobs($user_id);

        if(!$idleJobs){
            return [];
        }

        return $idleJobs;
    }
}