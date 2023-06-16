<?php

namespace App\Repositories;

use DateTime;
use App\Models\Income;
use Illuminate\Support\Facades\DB;
class IncomeRepository
{
    public static function create(array $args){
        return DB::transaction(function () use($args) {
            $dateExpires = DateTime::createFromFormat('d/m/Y', $args['expires']);
            $newIncome = Income::create([
                'description' => $args['description']? $args['description'] : '',
                'establishment' => $args['establishment'],
                'installments' => intval($args['installments']),
                'value_installment' => floatval($args['value_installment']),
                'expires' => $dateExpires,
                'user_id' => $args['user_id']
            ]);

            return $newIncome;
        });
    }
}