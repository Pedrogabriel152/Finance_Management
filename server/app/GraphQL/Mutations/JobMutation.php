<?php

namespace App\GraphQL\Mutations;

final class JobMutation
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    public static function createJob($_, array $args)
    {
        dd($args);
    }
}
