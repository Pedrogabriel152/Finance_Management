<?php

namespace App\Services;

use App\Repositories\JobRepository;

class JobService
{
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

    public static function getJobs(int $id){
        $jobs = JobRepository::getJobs($id);
        return $jobs? $jobs : [];
    }

    public static function getJob(array $args){
        $job = JobRepository::getJob($args['id'], $args['user_id']);
        return $job;
    }

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
}