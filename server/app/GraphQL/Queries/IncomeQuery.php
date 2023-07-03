<?php

namespace App\GraphQL\Queries;

use App\Services\IncomeService;

final class IncomeQuery
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    // Search for an Income
    public function getIncome($_, array $args)
    {
        $response = IncomeService::getIncome($args);
        return $response;
    }

    // Search for an Incomes
    public function getIncomes($_, array $args)
    {
        $response = IncomeService::getIncomes($args);
        return $response;
    }

    // Search for an Incomes open
    public function getIncomesOpen($_, array $args)
    {
        $response = IncomeService::getIncomesOpen($args);
        return $response;
    }

    // Search for an Incomes close
    public function getIncomesClose($_, array $args)
    {
        $response = IncomeService::getIncomesClose($args);
        return $response;
    }

    public function getTotalEIncomes($_, array $args){
        $response = IncomeService::getTotalIncomes($args['user_id']);
        return $response;
    }

    // Get Five Expense
    public function getFiveIncomes($_, array $args) 
    {
        $response = IncomeService::getFiveIncomes($args['user_id']);
        return $response;
    }

    public function getIncomesMonth($_, array $args)
    {
        $response = IncomeService::getIncomesMonth($args['user_id']);
        return $response;
    }
}
