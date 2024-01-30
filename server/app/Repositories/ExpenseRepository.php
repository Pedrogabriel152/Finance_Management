<?php

namespace App\Repositories;

use App\Models\Expense;
use App\Services\ExpenseService;
use DateTime;
use Illuminate\Support\Facades\DB;

class ExpenseRepository
{
    private ExpenseService $expenseService_;

    public function __construct()
    {
        $this->expenseService_ = new ExpenseService();    
    }

    // Save a new Expense in the database
    public function createExpense(array $args){
        if (!key_exists('months_paid', $args)){
            $args['months_paid'] = serialize([[
                'month' => 0,
                'year' => 0,
                'paid' => 0,
                'expires' => null
            ]]);
        } 
        return DB::transaction(function () use($args){
            $dateExpires = new DateTime($args['expires']);
            $newExpense = Expense::create([
                'description' => $args['description']? $args['description'] : '',
                'merchandise_purchased' => $args['merchandise_purchased'],
                'establishment' => $args['establishment'],
                'installments' => $args['installments'],
                'expires' => $dateExpires,
                'value_installment' => floatval($args['value_installment']),
                'user_id' => $args['user_id'],
                'installments_paid' => $args['installments_paid'] > 0? $args['installments_paid'] : 0,
                'months_paid' => $args['months_paid']
            ]);

            if($newExpense->installments == $newExpense->installments_paid) {
                $newExpense->paid_expense = true;
                $newExpense->save();
            }
            
            return $newExpense;
        });
    }

    // Search the database for an expense
    public function getExpense(array $args){
        return DB::transaction(function () use($args){
            $expense = Expense::where([
                ['id', '=', $args['id']],
                ['user_id', '=', $args['user_id']]
            ])->first();
            
            return $expense;
        });
    }

    // Search the database for an expenses
    public function getExpenses(array $args){
        return DB::transaction(function () use($args){
            $expenses = Expense::where([
                ['user_id', '=', $args['user_id']]
            ])->orderBy('expires', 'asc')->paginate(6);
            
            return $expenses;
        });
    }

    // Search the database for an expenses open
    public function getExpensesOpen(array $args){
        return DB::transaction(function () use($args) {
            $incomes = Expense::where([
                ['user_id', '=', $args['user_id']],
                ['paid_expense', '=', false]
            ])->orderBy('expires', 'asc')->paginate(6);

            return $incomes;
        });
    }

    // Search the database for an expenses close
    public function getExpensesClose(array $args){
        return DB::transaction(function () use($args) {
            $incomes = Expense::where([
                ['user_id', '=', $args['user_id']],
                ['paid_expense', '=', true]
            ])->orderBy('expires', 'asc')->paginate(6);

            return $incomes;
        });
    }

    // Save an updated Expense to the database
    public function updatePayInstallment(object $expense){
        return DB::transaction(function () use($expense){
            $updateExpense = $expense;
            $months_paid = unserialize($updateExpense->months_paid);
            if($updateExpense->installments_paid === 0) {
                $months_paid = [];
            }
            $updateExpense->installments_paid = $expense->installments_paid + 1;

            if(!$updateExpense->paid_expense){
                $newDateExpires = $this->expenseService_->updateDateExpire($updateExpense);
                $month = date('m', strtotime($updateExpense->expires));
                $year = date('Y', strtotime($updateExpense->expires));
                $day = date('d',strtotime($updateExpense->expires));
                $months_paid[] = [
                    'month' => $month,
                    'total' => floatval($updateExpense->value_installment),
                    'year' => $year,
                    'expires' => "$day/$month/$year"
                ];
                $updateExpense->expires = $newDateExpires;
                $updateExpense->months_paid = serialize($months_paid);
            }

            if($updateExpense->installments_paid === $updateExpense->installments){
                $updateExpense->paid_expense = true;
            }

            $updateExpense->save();
    
            return $updateExpense;
        });
    }

    // Save an updated Expense to the database
    public function editExpense(array $args, object $expense){
        return DB::transaction(function () use($args, $expense){
            $dateExpires = new DateTime($args['expires']);
            $editExpense = $expense;
            $editExpense->description = $args['description']? $args['description'] : '';
            $editExpense->merchandise_purchased = $args['merchandise_purchased'];
            $editExpense->establishment = $args['establishment'];
            $editExpense->installments = $args['installments'];
            $editExpense->value_installment = $args['value_installment'];
            $editExpense->installments_paid = $args['installments_paid'] > $args['installments']? $args['installments'] : $args['installments_paid'];
            $editExpense->expires = $dateExpires;
            $editExpense->paid_expense = $args['installments_paid'] >= $args['installments']? true: false;
            $editExpense->save();

            return $editExpense;
        });
    }

    // Search for total Expense amounts
    public function getTotalExpenses(int $user_id){
        return DB::transaction(function () use($user_id){
            $currentMonth = date('m');
            $currentYear = date('Y');
            $maxDay = 30;

            if($currentMonth == 2) {
                $maxDay = 28;
            }  
            $maxDate = "$currentYear-$currentMonth-$maxDay";
            $minDate = "$currentYear-$currentMonth-01";
            $totalExpenses = [];

            $totalExpense = Expense::where([
                ['user_id', '=', $user_id],
                ['installments_paid', '=', false]
            ])->count();
            $totalValue = Expense::where([
                ['user_id', '=', $user_id]
            ])->whereBetween(DB::raw("TO_CHAR(expires, 'YYYY-MM-DD')"), [$minDate, $maxDate])->sum('value_installment');
            $totalExpenses['totalExpenses'] = $totalExpense;
            $totalExpenses['total'] = $totalValue;
      
            return $totalExpenses;
        });
    }

    public function getFiveExpenses(int $user_id){
        return DB::transaction(function () use($user_id) {
            $expenses = Expense::where('user_id', $user_id)->orderBy('value_installment', 'desc')->limit(5)->get();
            return $expenses;
        });
    }

    public function getExpensesMonth(int $user_id, string $minDate, string $maxDate) {
        return DB::transaction(function () use($user_id, $minDate, $maxDate){
            $spentMonth = Expense::where('user_id',$user_id)->whereBetween('created_at', [$minDate, $maxDate])->get();

            return $spentMonth;
        });
    }

    public function getActiveExpense(int $user_id) {
        return DB::transaction(function () use($user_id) {
            $expenses = Expense::where([
                ['user_id', '=', $user_id],
                ['paid_expense', '=', false]
            ])->orderBy('value_installment', 'desc')->paginate(6);
            return $expenses;
        });
    }

    public function getIdleExpense(int $user_id) {
        return DB::transaction(function () use($user_id) {
            $expenses = Expense::where([
                ['user_id', '=', $user_id],
                ['paid_expense', '=', true]
            ])->orderBy('value_installment', 'desc')->paginate(6);
            return $expenses;
        });
    }

    public function getAllExpense(int $user_id) {
        return DB::transaction(function () use($user_id) {
            $expenses = Expense::where([
                ['user_id', '=', $user_id],
            ])->orderBy('value_installment', 'desc')->paginate(6);
            return $expenses;
        });
    }
}