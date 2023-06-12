<?php

namespace App\GraphQL\Queries;

use App\Services\ExpenseService;

final class ExpenseQuery
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    public function getExpense($_, array $args)
    {
        $response = ExpenseService::getExpense($args);
        return $response;
    }

    public function getExpenses($_, array $args)
    {
        $response = ExpenseService::getExpenses($args);
        return $response;
    }
}
