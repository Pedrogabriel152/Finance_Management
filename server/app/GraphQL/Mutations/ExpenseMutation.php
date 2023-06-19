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

    // Create new Expense
    public function createExpense($_, array $args)
    {
        $response = ExpenseService::createExpense($args);
        return $response;
    }

    // Update installment 
    public function payInstallment($_, array $args)
    {
        $response = ExpenseService::payInstallment($args);
        return $response;
    }

    // Update Expense
    public function editExpense($_, array $args)
    {
        $response = ExpenseService::editExpense($args);
        return $response;
    }
}