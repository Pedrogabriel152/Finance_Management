<?php

namespace App\Services;

use App\Repositories\IncomeRepository;

class IncomeService
{
    // Income creation service
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

    // Search service an income
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

    // Income update service
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

    // Recived installment upgrade service
    public static function payInstallment(array $args){
        try {
            $income = IncomeRepository::getIncome($args);

            if(!$income){
                return [
                    'code' => 404,
                    'message' => 'Renda não encontrada!'
                ];
            }

            if($income->received_income === true){
                return [
                    'code' => 200,
                    'message' => 'Renda ja foi recebida por completo',
                    'in$income' => $income
                ];
            }

            $updateIncome = IncomeRepository::updatePayInstallment($income);

            return [
                'code' => 200,
                'message' => 'Renda atualizada',
                'income' => $updateIncome
            ];

        } catch (\Throwable $th) {
            return [
                'code' => 500,
                'message' => 'Renda não encontrada!'
            ];
        }
    }

    // Expiration date update service
    public static function updateDateExpire(object $updateIncome){
        $dateExpires = explode("-", $updateIncome->expires);
            $month = intval($dateExpires[1]) + 1;

        if($month > 12) {
            $month = 1;
            $dateExpires[0] = intval($dateExpires[0] + 1);
        }

        if($month == 2 && intval($dateExpires[2]) > 28){
            $dateExpires[2] = 28;
        }

        $newDateExpires = $dateExpires[0].'-0'.$month.'-'. $dateExpires[2];
        if($month >= 10){
            $newDateExpires = $dateExpires[0].'-'.$month.'-'. $dateExpires[2];
        }
        return $newDateExpires;
    }
}