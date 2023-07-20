<?php

namespace App\Services;

use DateTime;
use App\Repositories\JobRepository;
use App\Repositories\IncomeRepository;

class IncomeService
{
    // Income creation service
    public static function createIncome(array $args){

        if($args['income']['installments_received'] >= 1){
            $dateExpires = DateTime::createFromFormat('d/m/Y', $args['income']['expires']);
            $months_paid = [];
            
            for($i=$args['income']['installments_received'];$i>=1;$i--){
                $dateExpires->modify("-{$i} months");
                $expiresYear = $dateExpires->format('Y');
                $expireMonth = $dateExpires->format('m');
                $dateExpires = DateTime::createFromFormat('d/m/Y', $args['income']['expires']);

                $months_paid[] = [
                    'month' => intval($expireMonth),
                    'total' => floatval($args['income']['value_installment']),
                    'year' => $expiresYear
                ];
            }
            $args['income']['months_paid'] = serialize($months_paid);
        }

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
            return $incomes? $incomes : [];

        } catch (\Throwable $th) {
            return [];
        }
    }

    // Search service an incomes open
    public static function getIncomesOpen(array $args){
        $incomes = IncomeRepository::getIncomesOpen($args);
        return $incomes? $incomes : [];
    }

    // Search service an incomes close
    public static function getIncomesClose(array $args){
        $incomes = IncomeRepository::getIncomesClose($args);
        return $incomes? $incomes : [];
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
                "total" => 0,
                'year' => $beginningMonth > 12? $currentYear : $beginningYear
            ];

            $beginningMonth++;
            if($beginningMonth > 12) {
                $beginningMonth == 1;
            }
        }

        $incomes = IncomeRepository::getIncomesMonth($user_id, $minDate, $maxDate);
        $jobs = JobRepository::getJobs($user_id);
        $incomesMonths = IncomeService::organizeIncome($incomes, $jobs, $incomesMonths);

        foreach ($incomesMonths as $key => $incomeMonth) {   
            $incomesMonths[$key]['month'] = $months[intval($incomeMonth['month']) - 1];
        }

        return $incomesMonths;
    }

    private static function organizeIncome($incomes, $jobs, array $incomesMonths){ 
        foreach ($incomes as $key => $income) {
            $currentYear = date('Y');
            $monthsPaids = unserialize($income->months_paid);
            $monthYear = date('Y', strtotime($income->expires));
            $monthExpires = date('m', strtotime($income->expires));
        
            foreach ($monthsPaids as $keyMonthPaid => $monthPaid) {
                foreach ($incomesMonths as $keyIncomes => $incomeMonth) {
                    $month = date('m', strtotime($income->expires));
                    if($monthPaid['month'] === 0 && $monthYear === $currentYear){
                        if(intval($incomeMonth['month']) === intval($month)){
                            $incomesMonths[$keyIncomes]['total'] = floatval($incomeMonth['total']) + floatval($income->value_installment);
                        }
                    }

                    if(intval($monthPaid['month']) > 0) {
                        if(intval($monthPaid['month']) === intval($incomeMonth['month']) && $monthPaid['year'] === $currentYear){
                            $incomesMonths[$keyIncomes]['total'] = floatval($incomeMonth['total']) + floatval($income->value_installment);
                        }

                        if(!$income->received_income){
                            if(intval($monthYear) === intval($currentYear) && intval($monthExpires) === intval($incomeMonth['month'])){
                                $incomesMonths[$keyIncomes]['total'] = floatval($incomeMonth['total']) + floatval($income->value_installment);
                            }
                        }
                    }                    
                }
            } 
        }

        foreach ($jobs as $key => $job) {
            foreach ($incomesMonths as $keyIncomes => $incomeMonth) {   
                $date = $incomeMonth['year']."-".$incomeMonth['month'].'-01';
                $dateStartedMonth = date('m-Y', strtotime($date));
                $dateStartedJob = date('m-Y',  strtotime($job->started));

                if($dateStartedMonth >= $dateStartedJob){
                    if($job->leave) {
                        $monthLeaved = date('m-Y', strtotime($job->leave));
                        $dateLeaveddMonth = date('m-Y', strtotime($incomeMonth['year']."-".$incomeMonth['month']."-30"));
            
                        if($monthLeaved >= $dateLeaveddMonth) {
                            $incomesMonths[$keyIncomes]['total'] = floatval($incomeMonth['total']) + floatval($job->wage);
                        }
                    } 

                    if(!$job->leave) {
                        $incomesMonths[$keyIncomes]['total'] = floatval($incomeMonth['total']) + floatval($job->wage);
                    }
                }                 
            }
        }
        return $incomesMonths;
    }

    public static function getActiveIncomes(int $user_id){
        $activeIncome = IncomeRepository::getActiveIncomes($user_id);
        return $activeIncome? $activeIncome : [];
    }

    public static function getIdleIncomes(int $user_id) {
        $idleIncome = IncomeRepository::getIdleIncomes($user_id);
        return $idleIncome? $idleIncome : [];
    }

    public static function getAllIncomes(int $user_id) {
        $Incomes = IncomeRepository::getAllIncomes($user_id);
        return $Incomes;
    }
} 