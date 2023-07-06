<?php

namespace App\Services;

use App\Models\Income;
use App\Repositories\IncomeRepository;
use App\Repositories\JobRepository;

class IncomeService
{
    // Income creation service
    public static function createIncome(array $args){
        $newIncome = IncomeRepository::create($args['income']);
        
        if(!$newIncome){
            return [
                'code' => 500,
                'message' => 'Falha ao cadastrar a renda!'
            ];
        }

        $dateExpires = $newIncome->expires->format("d/m/Y H:i:s");
        $newIncome->expires = $dateExpires;

        return [
            'code' => 200,
            'message' => 'Renda cadastrada com sucesso',
            'income' => $newIncome
        ];

    }

    // Search service an income
    public static function getIncome(array $args){
        $income = IncomeRepository::getIncome($args);
        
        if(!$income){
            return [
                'code' => 404,
                'message' => 'Renda não encontrada'
            ];
        }

        return [
            'code' => 200,
            'message' => 'Renda encontrada',
            'income' => $income
        ];
    }

    // Search service an last five incomes
    public static function getFiveIncomes(int $user_id){
        try {
            $incomes = IncomeRepository::getFiveIncomes($user_id);

            if(!$incomes){
                return [];
            }

            return $incomes;

        } catch (\Throwable $th) {
            return [];
        }
    }

    // Search service an incomes open
    public static function getIncomesOpen(array $args){
        $incomes = IncomeRepository::getIncomesOpen($args);
        
        if(!$incomes){
            return [];
        }

        return $incomes;
    }

    // Search service an incomes close
    public static function getIncomesClose(array $args){
        $incomes = IncomeRepository::getIncomesClose($args);
        
        if(!$incomes){
            return [];
        }

        return $incomes;
    }

    // Search service an incomes
    public static function getIncomes(array $args){
        $incomes = IncomeRepository::getIncomes($args);
        
        if(!$incomes){
            return [
                'code' => 404,
                'message' => 'Renda não encontrada',
                'incomes' => []
            ];
        }

        return $incomes;
    }

    // Income update service
    public static function editIncome(array $args){
        $income = IncomeRepository::getIncome($args);
        
        if(!$income){
            return [
                'code' => 404,
                'message' => 'Renda não encontrada'
            ];
        }

        try {
            $updateIncome = IncomeRepository::updateIncome($income, $args['income']);
            $dateExpires = $updateIncome->expires->format("d/m/Y H:i:s");
            $updateIncome->expires = $dateExpires;

            return [
                'code' => 200,
                'message' => 'Renda atualizada com sucesso',
                'income' => $updateIncome
            ];

        } catch (\Throwable $th) {
            return [
                'code' => 500,
                'message' => 'Falha ao atualizar a renda, tente novamente'
            ];
        }
        
    }

    // Recived installment upgrade service
    public static function payInstallment(array $args){
        try {
            $income = IncomeRepository::getIncome($args);

            if(!$income){
                return [
                    'code' => 404,
                    'message' => 'Renda não encontrada!'
                ];
            }

            if($income->received_income === true){
                return [
                    'code' => 200,
                    'message' => 'Renda ja foi recebida por completo',
                    'in$income' => $income
                ];
            }

            $updateIncome = IncomeRepository::updatePayInstallment($income);

            return [
                'code' => 200,
                'message' => 'Renda atualizada',
                'income' => $updateIncome
            ];

        } catch (\Throwable $th) {
            return [
                'code' => 500,
                'message' => 'Renda não encontrada!'
            ];
        }
    }

    // Expiration date update service
    public static function updateDateExpire(object $updateIncome){
        $dateExpires = explode("-", $updateIncome->expires);
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

     // Total expense search service
     public static function getTotalIncomes(int $user_id){
        $incomes = IncomeRepository::getTotalIncomes($user_id);
        return $incomes;
    }

    public static function getIncomesMonth(int $user_id){
        $months = ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Des'];
        $incomesMonths = [];
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
            $incomesMonths[$i] = [
                'month' => $beginningMonth,
                "total" => 0
            ];

            $beginningMonth++;
        }

        $incomes = IncomeRepository::getIncomesMonth($user_id, $minDate, $maxDate);
        $jobs = JobRepository::getJobs($user_id);
        $incomesMonth = IncomeService::organizeIncome($incomes, $jobs, $incomesMonths);

        foreach ($incomesMonths as $keyArray => $value) {  
            foreach ($incomesMonth as $key => $incomeMonth) {   
                if(intval($incomeMonth->month) === $value['month']){
                    $incomesMonths[$keyArray] = [
                        'month' => $incomeMonth->month,
                        'total' => $incomeMonth->total
                    ];
                } 
            }
        }

        foreach ($incomesMonths as $key => $incomeMonth) {   
            $incomesMonths[$key]['month'] = $months[intval($incomeMonth['month']) - 1];
        }

        return $incomesMonths;
    }

    private static function organizeIncome($incomes, $jobs, array $incomesMonths){
        foreach ($incomes as $key => $income) {
            $month = date('m', strtotime($income->expires));
            $year = date('Y', strtotime($income->expires));
            $curentYear = date('Y');
            foreach ($incomesMonths as $KeyMonths => $value) {
                if(intval($month) === intval($value['month']) && intval($year) === intval($curentYear)){
                    $incomesMonths[$KeyMonths] = [
                        'month' => $month,
                        'total' => $value['total'] + intval($income->value_installment)
                    ];
                }

                if((intval($year) - 1) === intval($curentYear) && intval($income->installments_received) > 0){
                    $beginningMonth = intval($month) - $income->value_installment;
                    
                    if($beginningMonth < 0) {
                        $beginningMonth = -($beginningMonth);
                    }

                    // dd($beginningMonth);
                }
            } 
        }
        // $arrayInicial = serialize([['month' => 0, 'paid' => 0, 'year' => 0]]);
        // dd($arrayInicial);

        // dd(unserialize($arrayInicial));

        dd($income->months_paid);
    }

    public static function updateMonthsPaid(int $user_id) {
        $incomes = Income::where('user_id', $user_id)->get();
        $incomes = Income::whereId(11)->get();
        
        
        foreach ($incomes as $key => $income) {
            $month = date('m', strtotime($income->expires));
            $year = date('Y', strtotime($income->expires));
            $months_paid = [];
            
            if($income->installments_received > 0){
                $installments_received = $income->installments_received;

                for($i=1;$i <= $installments_received; $i++) {
                    $month = intval($month) - $i;

                    if($month == 0) {
                        $month = 12 + $month;
                    }
                    
                    $months_paid[] = [
                        'month' => $month,
                        'total' => $income->value_installment,
                        'year' => $year
                    ];
                } 
            }

            if($months_paid) {
                dd($months_paid);
            }
            
        }
        
    }
}