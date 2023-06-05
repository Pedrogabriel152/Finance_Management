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
}