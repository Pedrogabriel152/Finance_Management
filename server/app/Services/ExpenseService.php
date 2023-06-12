<?php

namespace App\Services;

use App\Repositories\ExpenseRepository;

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
                'message' => 'Falha ao cadastrar a despesa!'
            ];
        }
    }

    public static function getExpense(array $args){
        try {
            $expense = ExpenseRepository::getExpense($args);

            if(!$expense){
                return [
                    'code' => 404,
                    'message' => 'Despesa não encontrada!'
                ];
            }

            return [
                'code' => 200,
                'message' => 'Despesa encontrada',
                'expense' => $expense
            ];

        } catch (\Throwable $th) {
            return [
                'code' => 500,
                'message' => 'Despesa não encontrada!'
            ];
        }
    }

    public static function payInstallment(array $args){
        try {
            $expense = ExpenseRepository::getExpense($args);

            if(!$expense){
                return [
                    'code' => 404,
                    'message' => 'Despesa não encontrada!'
                ];
            }

            if($expense->paid_expense === true){
                return [
                    'code' => 200,
                    'message' => 'Despesa ja foi paga por completo',
                    'expense' => $expense
                ];
            }

            $updateExpense = ExpenseRepository::updatePayInstallment($expense);

            return [
                'code' => 200,
                'message' => 'Despesa atualizada',
                'expense' => $updateExpense
            ];

        } catch (\Throwable $th) {
            return [
                'code' => 500,
                'message' => 'Despesa não encontrada!'
            ];
        }
    }
}