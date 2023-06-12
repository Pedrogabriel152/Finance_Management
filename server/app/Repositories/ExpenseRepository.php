<?php

namespace App\Repositories;

use App\Models\Expense;
use DateTime;
use Illuminate\Support\Facades\DB;

class ExpenseRepository
{
    public static function createExpense(array $args){
        return DB::transaction(function () use($args){
            $dateExpires = new DateTime($args['expense']['expires']);
            $newExpense = Expense::create([
                'description' => $args['expense']['description']? $args['expense']['description'] : '',
                'merchandise_purchased' => $args['expense']['merchandise_purchased'],
                'establishment' => $args['expense']['establishment'],
                'installments' => $args['expense']['installments'],
                'expires' => $dateExpires,
                'value_installment' => $args['expense']['value_installment'],
                'user_id' => $args['expense']['user_id']
            ]);
            
            return $newExpense;
        });
    }

    public static function getExpenses(array $args){

    }
}