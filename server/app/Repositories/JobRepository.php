<?php

namespace App\Repositories;

use DateTime;
use App\Models\Job;
use Illuminate\Support\Facades\DB;

class JobRepository 
{
    // Save a new Job in the database
    public static function create(array $args){
        return DB::transaction(function () use($args){
            $jobStarted = DateTime::createFromFormat('d/m/Y', $args['job']['started']);
            $newJob = Job::create([
                'description' => $args['job']['description']? $args['job']['description'] : '',
                'wage' => floatval($args['job']['wage']),
                'establishment' => $args['job']['establishment'],
                'started' => $jobStarted,
                'user_id' => $args['job']['user_id'],
            ]);

            if(array_key_exists('leave', $args['job'])){
                $jobLeaved = DateTime::createFromFormat('d/m/Y', $args['job']['leave']);
                $newJob->leave = $jobLeaved;
                $newJob->active = false;
                $newJob->save();
            }

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
        $jobs = Job::where([
            ['user_id', '=', $user_id],
            ['active', '=', true]
        ])->orderBy('wage', 'desc')->limit(5)->get();
        return $jobs;
    }

    // Save an updated Job to the database
    public static function updateJob(array $args, object $jobExist){
        return DB::transaction(function () use($args, $jobExist){
            $jobExist->description = $args['description']? $args['description'] : '';
            $jobExist->wage = $args['wage'];
            $jobExist->user_id = $args['user_id'];
            $jobExist->establishment = $args['establishment'];

            if(array_key_exists('active', $args)){
                $jobLeaved = DateTime::createFromFormat('d/m/Y', date('d-m-Y'));
                $jobExist->leave = $jobLeaved;
                $jobExist->active = false;
                $jobExist->save();
            }
            $jobExist->save();
            return $jobExist;
        });
    }

    public static function updateActiviJob(object $jobExist) {
        return DB::transaction(function () use ($jobExist) {
            $jobLeaved = date('d-m-Y');
            $jobExist->leave = $jobLeaved;
            $jobExist->active = false;
            $jobExist->save();

            return $jobExist;
        });
    }

    public static function getActiveJobs(int $user_id) {
        $activeJobs = Job::where([
            ['user_id', '=', $user_id],
            ['active', '=', true]
        ])->paginate(6);

        return $activeJobs;
    }

    public static function getIdleJobs(int $user_id){
        $idleJobs = Job::where([
            ['user_id', '=', $user_id],
            ['active', '=', false]
        ])->paginate(6);

        return $idleJobs;
    }
}