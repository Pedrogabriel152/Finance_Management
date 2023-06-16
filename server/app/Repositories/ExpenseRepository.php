<?php

namespace App\Repositories;

use App\Models\Expense;
use App\Services\ExpenseService;
use DateTime;
use Illuminate\Support\Facades\DB;

class ExpenseRepository
{
    public static function createExpense(array $args){
        return DB::transaction(function () use($args){
            $dateExpires = DateTime::createFromFormat('d/m/Y', $args['expense']['expires']);
            $newExpense = Expense::create([
                'description' => $args['expense']['description']? $args['expense']['description'] : '',
                'merchandise_purchased' => $args['expense']['merchandise_purchased'],
                'establishment' => $args['expense']['establishment'],
                'installments' => $args['expense']['installments'],
                'expires' => $dateExpires,
                'value_installment' => floatval($args['expense']['value_installment']),
                'user_id' => $args['expense']['user_id']
            ]);
            
            return $newExpense;
        });
    }

    public static function getExpense(array $args){
        return DB::transaction(function () use($args){
            $expense = Expense::where([
                ['id', '=', $args['id']],
                ['user_id', '=', $args['user_id']]
            ])->first();
            
            return $expense;
        });
    }

    public static function getExpenses(array $args){
        return DB::transaction(function () use($args){
            $expenses = Expense::where([
                ['user_id', '=', $args['user_id']],
                ['installments_paid', '=', false]
            ])->orderBy('created_at', 'desc')->paginate(15);
            
            return $expenses;
        });
    }

    public static function updatePayInstallment(object $expense){
        return DB::transaction(function () use($expense){
            $updateExpense = $expense;
            $updateExpense->installments_paid = $expense->installments_paid + 1;
            
            $newDateExpires = ExpenseService::updateDateExpire($updateExpense);
            $updateExpense->expires = $newDateExpires;

            if($updateExpense->installments_paid === $updateExpense->installments){
                $updateExpense->paid_expense = true;
            }

            $updateExpense->save();
    
            return $updateExpense;
        });
    }

    public static function editExpense(array $args, object $expense){
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

    public static function getTotalExpenses(int $user_id){
        return DB::transaction(function () use($user_id){
            $totalExpenses = [];
            $totalExpense = Expense::where([
                ['user_id', '=', $user_id],
                ['installments_paid', '=', false]
            ])->count();
            $totalValue = Expense::where([
                ['user_id', '=', $user_id],
                ['installments_paid', '=', false]
            ])->sum('value_installment');
            $totalExpenses['totalExpenses'] = $totalExpense;
            $totalExpenses['total'] = $totalValue;
      
            return $totalExpenses;
        });
    }
}