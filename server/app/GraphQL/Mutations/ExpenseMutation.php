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

    public function payInstallment($_, array $args)
    {
        $response = ExpenseService::payInstallment($args);
        return $response;
    }

    public function editExpense($_, array $args)
    {
        $response = ExpenseService::editExpense($args);
        return $response;
    }
}