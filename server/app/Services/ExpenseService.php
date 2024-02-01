<?php

namespace App\Services;

use App\Helpers\Helpers;
use DateTime;
use ErrorException;
use App\Repositories\ExpenseRepository;

date_default_timezone_set('America/Sao_Paulo');

class ExpenseService
{
    private ExpenseRepository $expenseRepository_;
    private array $months = ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Des'];

    public function __construct()
    {
        $this->expenseRepository_ = new ExpenseRepository();
    }

    // Expense creation service
    public function createExpense(array $args){
        try {
            $dateExpires = new DateTime($args['expense']['expires']);
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
                    $dateExpires =  new DateTime($args['expense']['expires']);
                }
                $args['expense']['months_paid'] = serialize($months_paid);
            }

            $newExpense = $this->expenseRepository_->createExpense($args['expense']);
           
            if(!$newExpense) throw new ErrorException('Falha ao cadastrar a despesa!', 500);
            
            $dateExpires = $newExpense->expires->format("d/m/Y H:i:s");
            $newExpense->expires = $dateExpires;

            return [
                'code' => 200,
                'message' => 'Despesa cadastrada com sucesso',
                'expense' => $newExpense
            ];

        } catch (\Throwable $th) {
            return [
                'code' => $th->getCode(),
                'message' => $th->getMessage()
            ];
        }
    }

    // Search service an expense
    public function getExpense(array $args){
        try {
            $expense = $this->expenseRepository_->getExpense($args);
            return $expense;

        } catch (\Throwable $th) {
            return;
        }
    }

    // Search service an expenses
    public function getExpenses(array $args){
        try {
            $expenses = $this->expenseRepository_->getExpenses($args);
            return $expenses? $expenses : [];
        } catch (\Throwable $th) {
            return [];
        }
    }

    // Search service an last five expense
    public function getFiveExpenses(int $user_id){
        try {
            $expenses = $this->expenseRepository_->getFiveExpenses($user_id);
            return $expenses? $expenses : [];
        } catch (\Throwable $th) {
            return [];
        }
    }

    // Search service an expense open
    public function getExpensesOpen(array $args){
        $expense = $this->expenseRepository_->getExpensesOpen($args);
        return $expense? $expense : [];
    }

    // Search service an expense close
    public function getExpensesClose(array $args){
        $expense = $this->expenseRepository_->getExpensesClose($args);
        return $expense? $expense : [];
    }

    // Paid installment upgrade service
    public function payInstallment(array $args){
        try {
            $expense = $this->expenseRepository_->getExpense($args);

            if(!$expense) throw new ErrorException('Despesa não encontrada!', 404);

            if($expense->paid_expense === true){
                return [
                    'code' => 200,
                    'message' => 'Despesa ja foi paga por completo',
                    'expense' => $expense
                ];
            }

            $this->expenseRepository_->updatePayInstallment($expense);

            return [
                'code' => 200,
                'message' => 'Despesa atualizada',
                'expense' => $expense
            ];

        } catch (\Throwable $th) {
            return [
                'code' => $th->getCode(),
                'message' => $th->getMessage()
            ];
        }
    }

    // Expense update service
    public function editExpense(array $args){
        try {
            $expense = $this->expenseRepository_->getExpense($args);

            if(!$expense) throw new ErrorException('Despesa não encontrada!', 404);

            $editExpense = $this->expenseRepository_->editExpense($args['expense'], $expense);
            $dateExpires = $editExpense->expires->format("d/m/Y H:i:s");
            $editExpense->expires = $dateExpires;

            if(!$editExpense) throw new ErrorException('Erro ao atualizar a despesa!', 500);

            return [
                'code' => 200,
                'message' => 'Despesa atualizada com sucesso!',
                'expense' => $editExpense
            ];

        } catch (\Throwable $th) {
            return [
                'code' => $th->getCode(),
                'message' => $th->getMessage()
            ];
        }
    }

    // Total expense search service
    public function getTotalExpenses(int $user_id){
        $expenses = $this->expenseRepository_->getTotalExpenses($user_id);
        return $expenses;
    }

    // Expiration date update service
    public function updateDateExpire(object $updateExpense){
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

    public function getExpensesMonth(int $user_id){
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
                'year' => $beginningMonth > 12? $currentYear : $beginningYear
            ];

            $beginningMonth++;

            if($beginningMonth > 12) {
                $beginningMonth = 1;
                $beginningYear++;
            }
        }

        $spentMonth = $this->expenseRepository_->getExpensesMonth($user_id, $minDate, $maxDate);
        $expensesMonth = Helpers::organizeFinance($spentMonth, $expensesMonth);

        foreach ($expensesMonth as $key => $expenseMonth) {   
            $expensesMonth[$key]['month'] = $this->months[intval($expenseMonth['month']) - 1];
        }

        return $expensesMonth;
    }

    public function organizeExpense($spentsMonth, array $expensesMonth){ 
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
    

    public function getActiveExpenses(int $user_id){
        $activeExpense = $this->expenseRepository_->getActiveExpense($user_id);
        return $activeExpense? $activeExpense : [];
    }

    public function getIdleExpenses(int $user_id) {
        $idleExpense = $this->expenseRepository_->getIdleExpense($user_id);
        return $idleExpense? $idleExpense : [];
    }

    public function getAllExpenses(int $user_id) {
        $expenses = $this->expenseRepository_->getAllExpense($user_id);
        return $expenses;
    }
}