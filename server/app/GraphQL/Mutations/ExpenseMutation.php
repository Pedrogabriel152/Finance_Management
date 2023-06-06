<?php

namespace App\GraphQL\Mutations;

use App\Services\ExpenseService;

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
        $response = ExpenseService::createExpense($args);
        return $response;
    }
}
