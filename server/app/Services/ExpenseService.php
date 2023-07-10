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
            return $expenses? $expenses : [];

        } catch (\Throwable $th) {
            return [];
        }
    }

    // Search service an last five expense
    public static function getFiveExpenses(int $user_id){
        try {
            $expenses = ExpenseRepository::getFiveExpenses($user_id);
            return $expenses? $expenses : [];

        } catch (\Throwable $th) {
            return [];
        }
    }

    // Search service an expense open
    public static function getExpensesOpen(array $args){
        $expense = ExpenseRepository::getExpensesOpen($args);
        
        if(!$expense){
            return [];
        }

        return $expense;
    }

    // Search service an expense close
    public static function getExpensesClose(array $args){
        $expense = ExpenseRepository::getExpensesClose($args);
        return $expense? $expense : [];
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

    public static function getExpensesMonth(int $user_id){
        $months = ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Des'];
        $expensesMonth = [];
        $currentMonth = date('m');
        $beginningMonth = intval($currentMonth) - 5;
        $currentYear = date('Y');
        $maxDay = 30;

        if($currentMonth == 2) {
            $maxDay = 28;
        }

        $beginningMonth = intval($currentMonth) - 5;
        if($beginningMonth == 0) {
            $beginningMonth = 12;
        } 

        if($beginningMonth < 0) {
            $beginningMonth = 12 + $beginningMonth;
        }

        $beginningYear = $currentYear;
        if($beginningMonth > intval($currentMonth)){
            $beginningYear = $currentYear - 1;
        }

        if($beginningMonth < 10){
            $beginningMonth = "0$beginningMonth";
        }

        $minDate = "$beginningYear-$beginningMonth-01";
        $maxDate = "$currentYear-$currentMonth-$maxDay";

        if($beginningMonth == 0) {
            $beginningMonth = 12;
        } 

        if($beginningMonth < 0) {
            $beginningMonth = 12 + $beginningMonth;
        }
        
        for($i=0;$i<6;$i++){
            $expensesMonth[$i] = [
                'month' => $beginningMonth,
                "total" => 0
            ];

            $beginningMonth++;
        }

        $spentMonth = ExpenseRepository::getExpensesMonth($user_id, $minDate, $maxDate);
        $expensesMonth = ExpenseService::organizeExpense($spentMonth, $expensesMonth);

        foreach ($expensesMonth as $key => $expenseMonth) {   
            $expensesMonth[$key]['month'] = $months[intval($expenseMonth['month']) - 1];
        }

        return $expensesMonth;
    }

    public static function organizeExpense($spentsMonth, array $expensesMonth){ 
        foreach ($spentsMonth as $key => $spentMonth) {
            $currentYear = date('Y');
            $monthsPaids = unserialize($spentMonth->months_paid);
            $monthYear = date('Y', strtotime($spentMonth->expires));
            $monthExpires = date('m', strtotime($spentMonth->expires));
        
            foreach ($monthsPaids as $keyMonthPaid => $monthPaid) {
                foreach ($expensesMonth as $keyExpenses => $expenseMonth) {
                    $month = date('m', strtotime($spentMonth->expires));
                    if($monthPaid['month'] === 0 && $monthYear === $currentYear){
                        if(intval($expenseMonth['month']) === intval($month)){
                            $expensesMonth[$keyExpenses]['total'] = floatval($expenseMonth['total']) + floatval($spentMonth->value_installment);
                        }
                    }

                    if(intval($monthPaid['month']) > 0) {
                        if(intval($monthPaid['month']) === intval($expenseMonth['month']) && $monthPaid['year'] === $currentYear){
                            $expensesMonth[$keyExpenses]['total'] = floatval($expenseMonth['total']) + floatval($spentMonth->value_installment);
                        }

                        if(!$spentMonth->paid_expense){
                            if(intval($monthYear) === intval($currentYear) && intval($monthExpires) === intval($expenseMonth['month'])){
                                $expensesMonth[$keyExpenses]['total'] = floatval($expenseMonth['total']) + floatval($spentMonth->value_installment);
                            }
                        }
                    }                    
                }
            } 
        }

        return $expensesMonth;
    }
}