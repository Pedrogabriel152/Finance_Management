<?php

namespace App\Repositories;

use App\Models\Job;
use Illuminate\Support\Facades\DB;

class JobRepository 
{
    // Save a new Job in the database
    public static function create(array $args){
        return DB::transaction(function () use($args){
            $newJob = Job::create([
                'description' => $args['job']['description']? $args['job']['description'] : '',
                'wage' => floatval($args['job']['wage']),
                'establishment' => $args['job']['establishment'],
                'user_id' => $args['job']['user_id']
            ]);

            return $newJob;
        });
    }

    // Search the database for an jobs
    public static function getJobs(int $id){
        $jobs = Job::where('user_id', $id)->orderBy('created_at','desc')->get();
        return $jobs;
    }

    // Search the database for an job
    public static function getJob(int $id, int $user_id){
        $job = Job::where([
            ['user_id','=', $user_id],
            ['id', '=', $id]
        ])->first();
        return $job;
    }

    // Search the database for an five jobs
    public static function getFiveJobs(int $user_id) {
        $jobs = Job::where('user_id', $user_id)->orderBy('wage', 'desc')->limit(5)->get();
        return $jobs;
    }

    // Save an updated Job to the database
    public static function updateJob(array $args, object $jobExist){
        return DB::transaction(function () use($args, $jobExist){
            $jobExist->description = $args['description']? $args['description'] : '';
            $jobExist->wage = $args['wage'];
            $jobExist->user_id = $args['user_id'];
            $jobExist->establishment = $args['establishment'];
            $jobExist->save();
            return $jobExist;
        });
    }
}