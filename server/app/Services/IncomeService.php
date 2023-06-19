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
            'message' => 'Renda cadastrada com sucesso',
            'income' => $newIncome
        ];

    }

    public static function getIncome(array $args){
        $income = IncomeRepository::getIncome($args);
        
        if(!$income){
            return [
                'code' => 404,
                'message' => 'Renda não encontrada'
            ];
        }

        return [
            'code' => 200,
            'message' => 'Renda encontrada',
            'income' => $income
        ];
    }

    public static function editIncome(array $args){
        $income = IncomeRepository::getIncome($args);
        
        if(!$income){
            return [
                'code' => 404,
                'message' => 'Renda não encontrada'
            ];
        }

        try {
            $updateIncome = IncomeRepository::updateIncome($income, $args['income']);
            $dateExpires = $updateIncome->expires->format("d/m/Y H:i:s");
            $updateIncome->expires = $dateExpires;

            return [
                'code' => 200,
                'message' => 'Renda atualizada com sucesso',
                'income' => $updateIncome
            ];

        } catch (\Throwable $th) {
            return [
                'code' => 500,
                'message' => 'Falha ao atualizar a renda, tente novamente'
            ];
        }
        
    }
}