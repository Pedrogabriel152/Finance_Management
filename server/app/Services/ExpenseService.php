<?php

namespace App\Services;

use App\Repositories\ExpenseRepository;
use DateTime;

date_default_timezone_set('America/Sao_Paulo');

class ExpenseService
{
    // Expense creation service
    public static function createExpense(array $args){
        try {
            $dateExpires = DateTime::createFromFormat('d/m/Y', $args['expense']['expires']);
            $month = $dateExpires->format('m');
            $year = $dateExpires->format('Y');
            $maxDateExpires = DateTime::createFromFormat('d/m/Y', "28/$month/$year");

            if($dateExpires > $maxDateExpires) {
                $dateExpires = $maxDateExpires;
                $args['expense']['expires'] = "28/$month/$year";
            }

            if($args['expense']['installments_paid'] >= 1){
                $months_paid = [];
                
                for($i=$args['expense']['installments_paid'];$i>=1;$i--){
                    $dateExpires->modify("-{$i} months");
                    $expiresYear = $dateExpires->format('Y');
                    $expireMonth = $dateExpires->format('m');
    
                    $months_paid[] = [
                        'month' => intval($expireMonth),
                        'total' => floatval($args['expense']['value_installment']),
                        'year' => $expiresYear,
                        'expires' => $dateExpires->format('d').'/'. $dateExpires->format('m').'/'. $dateExpires->format('Y')
                    ];
                    $dateExpires = DateTime::createFromFormat('d/m/Y', $args['expense']['expires']);
                }
                $args['expense']['months_paid'] = serialize($months_paid);
            }

            $newExpense = ExpenseRepository::createExpense($args['expense']);
           
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
                'message' => $th->getMessage()//'Falha ao cadastrar a despesa!'
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
                "total" => 0,
                'year' => $beginningYear
            ];

            $beginningMonth++;

            if($beginningMonth > 12) {
                $beginningMonth = 1;
                $beginningYear++;
            }
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
            $monthsPaids = unserialize($spentMonth->months_paid);
            
            $dateExpires = new DateTime($spentMonth->expires);

            foreach ($monthsPaids as $keyMonthPaid => $monthPaid) {
                foreach ($expensesMonth as $keyExpenses => $expenseMonth) {
                    $yearExpenseMonth = date('Y', strtotime($expenseMonth['year']));
                    $dateExpires = DateTime::createFromFormat('d/m/Y', $monthPaid['expires']);
                    $maxDate = DateTime::createFromFormat('d/m/Y', '28/'.$expenseMonth['month'].'/'.$yearExpenseMonth);
                    $minDate = DateTime::createFromFormat('d/m/Y', '01/'.$expenseMonth['month'].'/'.$yearExpenseMonth);

                    if($dateExpires >= $minDate && $dateExpires <= $maxDate){
                        $expensesMonth[$keyExpenses]['total'] = floatval($expenseMonth['total']) + floatval($spentMonth->value_installment);
                    }

                    if(!key_exists($keyMonthPaid + 1, $monthsPaids)){
                        $dateExpires = new DateTime($spentMonth->expires);

                        if($dateExpires >= $minDate && $dateExpires <= $maxDate){
                            $expensesMonth[$keyExpenses]['total'] = floatval($expenseMonth['total']) + floatval($spentMonth->value_installment);  
                        }
                    
                    }                  
                }
            } 

        }

        return $expensesMonth;
    }
    

    public static function getActiveExpenses(int $user_id){
        $activeExpense = ExpenseRepository::getActiveExpense($user_id);
        return $activeExpense? $activeExpense : [];
    }

    public static function getIdleExpenses(int $user_id) {
        $idleExpense = ExpenseRepository::getIdleExpense($user_id);
        return $idleExpense? $idleExpense : [];
    }

    public static function getAllExpenses(int $user_id) {
        $expenses = ExpenseRepository::getAllExpense($user_id);
        return $expenses;
    }
}