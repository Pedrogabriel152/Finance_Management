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

    public static function getIncome(array $args){
        return DB::transaction(function () use($args) {
            $income = Income::where([
                ['id', '=', $args['id']],
                ['user_id', '=', $args['user_id']]
            ])->first();

            return $income;
        });
    }

    public static function updateIncome(object $income, array $args){
        return DB::transaction(function () use($income, $args){
            $dateExpires = DateTime::createFromFormat('d/m/Y', $args['expires']);
            $updateIncome = $income;
            $updateIncome->description = $args['description']? $args['description'] : '';
            $updateIncome->establishment = $args['establishment'];
            $updateIncome->installments = intval($args['installments']);
            $updateIncome->value_installment = floatval($args['value_installment']);
            $updateIncome->expires = $dateExpires;
            $updateIncome->installments_received = intval($args['installments_received']);
            $updateIncome->received_income = $args['received_income'] ? $args['received_income'] : $income->received_income;
            $updateIncome->user_id = $income->user_id;
            $updateIncome->save();
            return $updateIncome;
        });
    }
}