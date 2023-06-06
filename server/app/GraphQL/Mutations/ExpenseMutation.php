<?php

namespace App\GraphQL\Mutations;

final class ExpenseMutation
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    public function createExpense($_, array $args)
    {
        dd($args);
    }
}
