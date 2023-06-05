<?php

namespace App\Repositories;

use App\Models\Job;
use Illuminate\Support\Facades\DB;

class JobRepository 
{
    public static function create(array $args){
        return DB::transaction(function () use($args){
            $newJob = Job::create([
                'description' => $args['job']['description']? $args['job']['description'] : '',
                'wage' => $args['job']['wage'],
                'establishment' => $args['job']['establishment'],
                'user_id' => $args['job']['user_id']
            ]);

            return $newJob;
        });
    }

    public static function getJobs(int $id){
        $jobs = Job::where('user_id', $id)->get();
        return $jobs;
    }

    public static function getJob(int $id, int $user_id){
        $job = Job::where([
            ['user_id','=', $user_id],
            ['id', '=', $id]
        ])->first();
        return $job;
    }
}