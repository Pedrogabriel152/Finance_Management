<?php

namespace App\Services;

use App\Repositories\ExpenseRepository;

date_default_timezone_set('America/Sao_Paulo');

class ExpenseService
{
    // Expense creation service
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

    // Search service an expense
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

    // Search service an expenses
    public static function getExpenses(array $args){
        try {
            $expenses = ExpenseRepository::getExpenses($args);

            if(!$expenses){
                return [];
            }

            return $expenses;

        } catch (\Throwable $th) {
            return [];
        }
    }

    // Search service an incomes open
    public static function getExpensesOpen(array $args){
        $incomes = ExpenseRepository::getExpensesOpen($args);
        
        if(!$incomes){
            return [];
        }

        return $incomes;
    }

    // Search service an incomes close
    public static function getExpensesClose(array $args){
        $incomes = ExpenseRepository::getExpensesClose($args);
        
        if(!$incomes){
            return [];
        }

        return $incomes;
    }

    // Paid installment upgrade service
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

    // Expense update service
    public static function editExpense(array $args){
        $expense = ExpenseRepository::getExpense($args);

        if(!$expense) {
            return [
                'code' => 404,
                'message' => 'Despesa não encontrada!'
            ];
        }

        $editExpense = ExpenseRepository::editExpense($args['expense'], $expense);
        $dateExpires = $editExpense->expires->format("d/m/Y H:i:s");
        $editExpense->expires = $dateExpires;

        if(!$editExpense) {
            return [
                'code' => 500,
                'message' => 'Erro ao atualizar a despesa!'
            ];
        }

        return [
            'code' => 200,
            'message' => 'Despesa atualizada com sucesso!',
            'expense' => $editExpense
        ];
    }

    // Total expense search service
    public static function getTotalExpenses(int $user_id){
        $expenses = ExpenseRepository::getTotalExpenses($user_id);
        return $expenses;
    }

    // Expiration date update service
    public static function updateDateExpire(object $updateExpense){
        $dateExpires = explode("-", $updateExpense->expires);
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