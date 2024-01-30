<?php

namespace App\GraphQL\Queries;

use App\Services\IncomeService;

class IncomeQuery
{
    private IncomeService $incomeService_;
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
        $this->incomeService_ = new IncomeService();
    }

    // Search for an Income
    public function getIncome($_, array $args)
    {
        $response = $this->incomeService_->getIncome($args);
        return $response;
    }

    // Search for an Incomes
    public function getIncomes($_, array $args)
    {
        $response = $this->incomeService_->getIncomes($args);
        return $response;
    }

    // Search for an Incomes open
    public function getIncomesOpen($_, array $args)
    {
        $response = $this->incomeService_->getIncomesOpen($args);
        return $response;
    }

    // Search for an Incomes close
    public function getIncomesClose($_, array $args)
    {
        $response = $this->incomeService_->getIncomesClose($args);
        return $response;
    }

    public function getTotalEIncomes($_, array $args){
        $response = $this->incomeService_->getTotalIncomes($args['user_id']);
        return $response;
    }

    // Get Five Expense
    public function getFiveIncomes($_, array $args) 
    {
        $response = $this->incomeService_->getFiveIncomes($args['user_id']);
        return $response;
    }

    public function getIncomesMonth($_, array $args)
    {
        $response = $this->incomeService_->getIncomesMonth($args['user_id']);
        return $response;
    }

    public function getActiveIncomes($_, array $args)
    {
        $response = $this->incomeService_->getActiveIncomes($args['user_id']);
        return $response;
    }

    public function getIdleIncomes($_, array $args) 
    {
        $response = $this->incomeService_->getIdleIncomes($args['user_id']);
        return $response;
    }

    public function getAllIncomes($_, array $args)
    {
        $response = $this->incomeService_->getAllIncomes($args['user_id']);
        return $response;
    }
}
