<?php

namespace App\GraphQL\Mutations;

use App\Services\ExpenseService;

class ExpenseMutation
{
    private ExpenseService $expenseService_;
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    public function __construct()
    {
        $this->expenseService_ = new ExpenseService();
    }

    // Create new Expense
    public function createExpense($_, array $args)
    {
        $response = $this->expenseService_->createExpense($args);
        return $response;
    }

    // Update installment 
    public function payInstallment($_, array $args)
    {
        $response = $this->expenseService_->payInstallment($args);
        return $response;
    }

    // Update Expense
    public function editExpense($_, array $args)
    {
        $response = $this->expenseService_->editExpense($args);
        return $response;
    }
}