<?php

namespace App\GraphQL\Mutations;

use App\Services\IncomeService;

final class IncomeMutation
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    public function createIncome($_, array $args)
    {
        $response = IncomeService::createIncome($args);
        return $response;
    }

    public function editIncome($_, array $args)
    {
        $response = IncomeService::editIncome($args);
        return $response;
    }
}
