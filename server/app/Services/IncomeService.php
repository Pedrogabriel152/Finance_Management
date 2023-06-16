<?php

namespace App\Services;

use App\Repositories\IncomeRepository;

class IncomeService
{
    public static function createIncome(array $args){
        $newIncome = IncomeRepository::create($args['income']);
        dd($newIncome);
    }
}