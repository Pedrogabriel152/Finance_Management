<?php

namespace App\GraphQL\Queries;

use App\Services\ExpenseService;

final class ExpenseQuery
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    // public function __invoke($_, array $args)
    // {
    //     // TODO implement the resolver
    // }

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

    // Search for an Incomes open
    public function getExpensesOpen($_, array $args)
    {
        $response = ExpenseService::getExpensesOpen($args);
        return $response;
    }

    // Search for an Incomes close
    public function getExpensesClose($_, array $args)
    {
        $response = ExpenseService::getExpensesClose($args);
        return $response;
    }

    // Search for total Expense amounts
    public function getTotalExpenses($_, array $args)
    {
        $response = ExpenseService::getTotalExpenses($args['user_id']);
        return $response;
    }

    // Get Five Expense
    public function getFiveExpenses($_, array $args) 
    {
        $response = ExpenseService::getFiveExpenses($args['user_id']);
        return $response;
    }

    // search expenses by month
    public function getExpensesMonth($_, array $args) 
    {
        $response = ExpenseService::getExpensesMonth($args['user_id']);
        return $response;
    }

    public function getActiveExpenses($_, array $args)
    {
        $response = ExpenseService::getActiveExpenses($args['user_id']);
        return $response;
    }

    public function getIdleExpenses($_, array $args) 
    {
        $response = ExpenseService::getIdleExpenses($args['user_id']);
        return $response;
    }

    public function getAllExpenses($_, array $args)
    {
        $response = ExpenseService::getAllExpenses($args['user_id']);
        return $response;
    }
}
