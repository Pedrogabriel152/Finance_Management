<?php

namespace App\GraphQL\Queries;

use App\Services\ExpenseService;

final class ExpenseQuery
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

    // Search for an Expense
    public function getExpense($_, array $args)
    {
        $response = $this->expenseService_->getExpense($args);
        return $response;
    }

    // Search for an Expenses
    public function getExpenses($_, array $args)
    {
        $response = $this->expenseService_->getExpenses($args);
        return $response;
    }

    // Search for an Incomes open
    public function getExpensesOpen($_, array $args)
    {
        $response = $this->expenseService_->getExpensesOpen($args);
        return $response;
    }

    // Search for an Incomes close
    public function getExpensesClose($_, array $args)
    {
        $response = $this->expenseService_->getExpensesClose($args);
        return $response;
    }

    // Search for total Expense amounts
    public function getTotalExpenses($_, array $args)
    {
        $response = $this->expenseService_->getTotalExpenses($args['user_id']);
        return $response;
    }

    // Get Five Expense
    public function getFiveExpenses($_, array $args) 
    {
        $response = $this->expenseService_->getFiveExpenses($args['user_id']);
        return $response;
    }

    // search expenses by month
    public function getExpensesMonth($_, array $args) 
    {
        $response = $this->expenseService_->getExpensesMonth($args['user_id']);
        return $response;
    }

    public function getActiveExpenses($_, array $args)
    {
        $response = $this->expenseService_->getActiveExpenses($args['user_id']);
        return $response;
    }

    public function getIdleExpenses($_, array $args) 
    {
        $response = $this->expenseService_->getIdleExpenses($args['user_id']);
        return $response;
    }

    public function getAllExpenses($_, array $args)
    {
        $response = $this->expenseService_->getAllExpenses($args['user_id']);
        return $response;
    }
}
