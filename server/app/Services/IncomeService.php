<?php

namespace App\Services;

use App\Repositories\IncomeRepository;

class IncomeService
{
    public static function createIncome(array $args){
        $newIncome = IncomeRepository::create($args['income']);
        
        if(!$newIncome){
            return [
                'code' => 500,
                'message' => 'Falha ao cadastrar a renda!'
            ];
        }

        $dateExpires = $newIncome->expires->format("d/m/Y H:i:s");
        $newIncome->expires = $dateExpires;

        return [
            'code' => 200,
            'message' => 'Despesa cadastrada com sucesso',
            'income' => $newIncome
        ];

    }
}