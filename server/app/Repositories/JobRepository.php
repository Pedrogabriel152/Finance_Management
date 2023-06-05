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
}