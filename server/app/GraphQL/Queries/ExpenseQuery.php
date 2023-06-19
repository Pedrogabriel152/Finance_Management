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

    // Search for an Expense
    public function getExpense($_, array $args)
    {
        $response = ExpenseService::getExpense($args);
        return $response;
    }

    // Search for an Expenses
    public function getExpenses($_, array $args)
    {
        $response = ExpenseService::getExpenses($args);
        return $response;
    }

    // Search for total Expense amounts
    public function getTotalExpenses($_, array $args)
    {
        $response = ExpenseService::getTotalExpenses($args['user_id']);
        return $response;
    }
}
