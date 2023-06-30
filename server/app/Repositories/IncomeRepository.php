<?php

namespace App\Repositories;

use DateTime;
use App\Models\Income;
use App\Models\Job;
use App\Services\IncomeService;
use Illuminate\Support\Facades\DB;

class IncomeRepository
{
    // Save a new Income in the database
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

    // Search the database for an income
    public static function getIncome(array $args){
        return DB::transaction(function () use($args) {
            $income = Income::where([
                ['id', '=', $args['id']],
                ['user_id', '=', $args['user_id']]
            ])->first();

            return $income;
        });
    }

    // Search the database for an incomes
    public static function getIncomes(array $args){
        return DB::transaction(function () use($args) {
            $incomes = Income::where([
                ['user_id', '=', $args['user_id']]
            ])->orderBy('created_at', 'desc')->paginate(15);

            return $incomes;
        });
    }

    // Search the database for an incomes open
    public static function getIncomesOpen(array $args){
        return DB::transaction(function () use($args) {
            $incomes = Income::where([
                ['user_id', '=', $args['user_id']],
                ['received_income', '=', false]
            ])->orderBy('created_at', 'desc')->paginate(15);

            return $incomes;
        });
    }

    // Search the database for an incomes close
    public static function getIncomesClose(array $args){
        return DB::transaction(function () use($args) {
            $incomes = Income::where([
                ['user_id', '=', $args['user_id']],
                ['received_income', '=', true]
            ])->orderBy('created_at', 'desc')->paginate(15);

            return $incomes;
        });
    }

    // Save an updated Income to the database
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

    // Save an updated Income to the database
    public static function updatePayInstallment(object $income){
        return DB::transaction(function () use($income){
            $updateIncome = $income;
            $updateIncome->installments_received = $income->installments_received + 1;

            if(!$updateIncome->received_income){
                $newDateExpires = IncomeService::updateDateExpire($updateIncome);
                $updateIncome->expires = $newDateExpires;
            }

            if($updateIncome->installments_received === $updateIncome->installments){
                $updateIncome->received_income = true;
            }

            $updateIncome->save();
    
            return $updateIncome;
        });
    }

    // Search for total Expense amounts
    public static function getTotalIncomes(int $user_id){
        return DB::transaction(function () use($user_id){
            $currentMonth = date('m');
            $currentYear = date('Y');
            $minValue = "$currentYear-$currentMonth-01";
            $maxValue = date('Y-m-d');
            $totalIncomes = [];

            $incomesValueTotal = Income::where([
                ['user_id', '=', $user_id],
                ['received_income', '=', false]
            ])->whereBetween('expires', [$minValue, $maxValue])->sum('value_installment');

            $jobsValueTotal = Job::where('user_id', $user_id)->sum('wage');

            $totalIncome = Income::where([
                ['user_id', '=', $user_id],
                ['received_income', '=', false]
            ])->count();

            $totalJobs = Job::where('user_id', $user_id)->count();

            $totalIncomes['totalIncomes'] = $totalIncome + $totalJobs;
            $totalIncomes['total'] = $incomesValueTotal + $jobsValueTotal;
      
            return $totalIncomes;
        });
    }

    public static function getFiveIncomes(int $user_id){
        return DB::transaction(function () use($user_id) {
            $incomes = Income::where('user_id', $user_id)->orderBy('value_installment', 'desc')->limit(5)->get();
            return $incomes;
        });
    }
}