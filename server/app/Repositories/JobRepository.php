<?php

namespace App\Repositories;

use DateTime;
use App\Models\Job;
use Illuminate\Support\Facades\DB;

class JobRepository 
{
    public function __construct()
    {
        
    }

    // Save a new Job in the database
    public function create(array $args){
        return DB::transaction(function () use($args){
            $newJob = Job::create([
                'description' => $args['job']['description']? $args['job']['description'] : '',
                'wage' => floatval($args['job']['wage']),
                'establishment' => $args['job']['establishment'],
                'started' => $args['job']['started'],
                'user_id' => $args['job']['user_id'],
            ]);

            if(array_key_exists('leave', $args['job'])){
                $newJob->leave = $args['job']['leave'];
                $newJob->active = false;
                $newJob->save();
            }

            return $newJob;
        });
    }

    // Search the database for an jobs
    public function getJobs(int $id){
        $jobs = Job::where('user_id', $id)->orderBy('wage','desc')->paginate(6);
        return $jobs;
    }

    // Search the database for an job
    public function getJob(int $id, int $user_id){
        $job = Job::where([
            ['user_id','=', $user_id],
            ['id', '=', $id]
        ])->first();
        return $job;
    }

    // Search the database for an five jobs
    public function getFiveJobs(int $user_id) {
        $jobs = Job::where([
            ['user_id', '=', $user_id],
            ['active', '=', true]
        ])->orderBy('wage', 'desc')->limit(5)->get();
        return $jobs;
    }

    // Save an updated Job to the database
    public function updateJob(array $args, Job &$jobExist){
        return DB::transaction(function () use($args, $jobExist){
            $jobExist->description = $args['description']? $args['description'] : '';
            $jobExist->wage = $args['wage'];
            $jobExist->user_id = $args['user_id'];
            $jobExist->establishment = $args['establishment'];

            if(array_key_exists('leave', $args) && $args['leave'] !== null){
                $jobExist->leave = $args['leave'];
                $jobExist->active = false;
            }else {
                $jobExist->leave = null;
                $jobExist->active = true;
            }

            $jobExist->save();
            return $jobExist;
        });
    }

    public function updateActiviJob(Job &$jobExist) {
        return DB::transaction(function () use ($jobExist) {
            $jobLeaved = DateTime::createFromFormat('d-m-Y', date('d-m-Y'));
            $jobExist->leave = $jobLeaved;
            $jobExist->active = false;
            $jobExist->save();

            return $jobExist;
        });
    }

    public function getActiveJobs(int $user_id) {
        $activeJobs = Job::where([
            ['user_id', '=', $user_id],
            ['active', '=', true]
        ])->paginate(6);

        return $activeJobs;
    }

    public function getIdleJobs(int $user_id){
        $idleJobs = Job::where([
            ['user_id', '=', $user_id],
            ['active', '=', false]
        ])->paginate(6);

        return $idleJobs;
    }
}