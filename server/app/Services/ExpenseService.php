<?php

namespace App\Services;

use App\Repositories\ExpenseRepository;
use DateTime;

date_default_timezone_set('America/Sao_Paulo');

class ExpenseService
{
    public static function createExpense(array $args){
        try {
            $newExpense = ExpenseRepository::createExpense($args);

            if(!$newExpense){
                return [
                    'code' => 500,
                    'message' => 'Falha ao cadastrar a despesa!'
                ];
            }
            $dateExpires = $newExpense->expires->format("d/m/Y H:i:s");
            $newExpense->expires = $dateExpires;

            return [
                'code' => 200,
                'message' => 'Despesa cadastrada com sucesso',
                'expense' => $newExpense
            ];

        } catch (\Throwable $th) {
            return [
                'code' => 500,
                'message' => $th->getMessage()
            ];
        }
    }
}