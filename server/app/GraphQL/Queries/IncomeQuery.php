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

    public function getIncome($_, array $args)
    {
        $response = IncomeService::getIncome($args);
        return $response;
    }
}
