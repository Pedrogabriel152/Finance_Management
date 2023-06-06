<?php

namespace App\Services;

use App\Repositories\ExpenseRepository;

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

            return [
                'code' => 200,
                'message' => 'Despesa cadastrada com sucesso',
                'expense' => $newExpense
            ];

        } catch (\Throwable $th) {
            return [
                'code' => 500,
                'message' => 'Falha ao cadastrar a despesa!'
            ];
        }
    }
}