<?php

namespace App\Repositories;

use App\Models\Expense;
use Illuminate\Support\Facades\DB;

class ExpenseRepository
{
    public static function createExpense(array $args){
        return DB::transaction(function () use($args){
            $newExpense = Expense::create([
                'description' => $args['expense']['description']? $args['expense']['description'] : '',
                'merchandise_purchased' => $args['expense']['merchandise_purchased'],
                'establishment' => $args['expense']['establishment'],
                'installments' => $args['expense']['installments'],
                'value_installment' => $args['expense']['value_installment'],
                'user_id' => $args['expense']['user_id']
            ]);
            
            return $newExpense;
        });
    }
}