<?php

namespace App\Services;

use DateTime;
use ErrorException;
use App\Models\Income;
use App\Repositories\JobRepository;
use App\Repositories\IncomeRepository;

class IncomeService
{
    private IncomeRepository $incomeRepository_;
    private JobRepository $jobRepository_;

    public function __construct()
    {
        $this->incomeRepository_ = new IncomeRepository();
        $this->jobRepository_ = new JobRepository();
    }

    // Income creation service
    public function createIncome(array $args){
        try {
            $dateExpires = new DateTime($args['income']['expires']);
            $month = $dateExpires->format('m');
            $year = $dateExpires->format('Y');
            $maxDateExpires = DateTime::createFromFormat('d/m/Y', "28/$month/$year");

            if($dateExpires > $maxDateExpires) {
                $dateExpires = $maxDateExpires;
                $args['income']['expires'] = "28/$month/$year";
            }

            if($args['income']['installments_received'] >= 1){
                $months_paid = [];
                
                for($i=$args['income']['installments_received'];$i>=1;$i--){
                    $dateExpires->modify("-{$i} months");
                    $expiresYear = $dateExpires->format('Y');
                    $expireMonth = $dateExpires->format('m');
                    

                    $months_paid[] = [
                        'month' => intval($expireMonth),
                        'total' => floatval($args['income']['value_installment']),
                        'year' => $expiresYear,
                        'expires' => $dateExpires->format('d').'/'. $dateExpires->format('m').'/'. $dateExpires->format('Y')
                    ];
                    $dateExpires = new DateTime($args['income']['expires']);
                }
                $args['income']['months_paid'] = serialize($months_paid);
            }

            $newIncome = $this->incomeRepository_->create($args['income']);
            
            if(!$newIncome) throw new ErrorException('Falha ao cadastrar a renda!', 500);

            $dateExpires = $newIncome->expires->format("d/m/Y H:i:s");
            $newIncome->expires = $dateExpires;

            return [
                'code' => 200,
                'message' => 'Renda cadastrada com sucesso',
                'income' => $newIncome
            ];
        } catch (\Throwable $th) {
            return [
                'code' => $th->getCode(),
                'message' => $th->getMessage()
            ];
        }

    }

    // Search service an income
    public function getIncome(array $args){
        $income = $this->incomeRepository_->getIncome($args);
        return $income;
    }

    // Search service an last five incomes
    public function getFiveIncomes(int $user_id){
        try {
            $incomes = $this->incomeRepository_->getFiveIncomes($user_id);
            return $incomes? $incomes : [];

        } catch (\Throwable $th) {
            return [];
        }
    }

    // Search service an incomes open
    public function getIncomesOpen(array $args){
        $incomes = $this->incomeRepository_->getIncomesOpen($args);
        return $incomes? $incomes : [];
    }

    // Search service an incomes close
    public function getIncomesClose(array $args){
        $incomes = $this->incomeRepository_->getIncomesClose($args);
        return $incomes? $incomes : [];
    }

    // Search service an incomes
    public function getIncomes(array $args){
        try {
            $incomes = $this->incomeRepository_->getIncomes($args);
        
            if(!$incomes) throw new ErrorException('Renda não encontrada', 404);

            return $incomes;
            
        } catch (\Throwable $th) {
            return [
                'code' => $th->getCode(),
                'message' => $th->getMessage(),
                'incomes' => []
            ];
        }
    }

    // Income update service
    public function editIncome(array $args){
        try {
            $income = $this->incomeRepository_->getIncome($args);
            
            if(!$income) throw new ErrorException('Renda não encontrada', 404);
        
            $this->incomeRepository_->updateIncome($income, $args['income']);
            $dateExpires = $income->expires->format("d/m/Y H:i:s");
            $income->expires = $dateExpires;

            return [
                'code' => 200,
                'message' => 'Renda atualizada com sucesso',
                'income' => $income
            ];

        } catch (\Throwable $th) {
            return [
                'code' => $th->getCode(),
                'message' => $th->getMessage()
            ];
        }
        
    }

    // Recived installment upgrade service
    public function payInstallment(array $args){
        try {
            $income = $this->incomeRepository_->getIncome($args);

            if(!$income) throw new ErrorException('Renda não encontrada', 404);

            if($income->received_income === true){
                return [
                    'code' => 200,
                    'message' => 'Renda ja foi recebida por completo',
                    'in$income' => $income
                ];
            }

            $this->incomeRepository_->updatePayInstallment($income);

            return [
                'code' => 200,
                'message' => 'Renda atualizada',
                'income' => $income
            ];

        } catch (\Throwable $th) {
            return [
                'code' => 500,
                'message' => 'Renda não encontrada!'
            ];
        }
    }

    // Expiration date update service
    public function updateDateExpire(Income $updateIncome){
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
    public function getTotalIncomes(int $user_id){
        $incomes = $this->incomeRepository_->getTotalIncomes($user_id);
        return $incomes;
    }

    public function getIncomesMonth(int $user_id){
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

        $incomes = $this->incomeRepository_->getIncomesMonth($user_id, $minDate, $maxDate);
        
        $jobs = $this->jobRepository_->getJobs($user_id);
        $incomesMonths = $this->organizeIncome($incomes, $jobs, $incomesMonths);

        foreach ($incomesMonths as $key => $incomeMonth) {   
            $incomesMonths[$key]['month'] = $months[intval($incomeMonth['month']) - 1];
        }

        return $incomesMonths;
    }

    private function organizeIncome($incomes, $jobs, array $incomesMonths){ 
        foreach ($incomes as $key => $income) {
            $monthsPaids = unserialize($income->months_paid);
            $dateExpires = new DateTime($income->expires);
        
            foreach ($monthsPaids as $keyMonthPaid => $monthPaid) {
                foreach ($incomesMonths as $keyIncomes => $incomeMonth) {
                    $yearIncomeMonth = date('Y', strtotime($incomeMonth['year']));
                    $dateExpires = DateTime::createFromFormat('d/m/Y', $monthPaid['expires']);
                    $maxDate = DateTime::createFromFormat('d/m/Y', '28/'.$incomeMonth['month'].'/'.$yearIncomeMonth);
                    $minDate = DateTime::createFromFormat('d/m/Y', '01/'.$incomeMonth['month'].'/'.$yearIncomeMonth);

                    if($dateExpires >= $minDate && $dateExpires <= $maxDate){
                        $incomesMonths[$keyIncomes]['total'] = floatval($incomeMonth['total']) + floatval($income->value_installment);
                    }

                    if(!key_exists($keyMonthPaid + 1, $monthsPaids)){
                        $dateExpires = new DateTime($income->expires);

                        if($dateExpires >= $minDate && $dateExpires <= $maxDate){
                            $incomesMonths[$keyIncomes]['total'] = floatval($incomeMonth['total']) + floatval($income->value_installment);  
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

    public function getActiveIncomes(int $user_id){
        $activeIncome = $this->incomeRepository_->getActiveIncomes($user_id);
        return $activeIncome? $activeIncome : [];
    }

    public function getIdleIncomes(int $user_id) {
        $idleIncome = $this->incomeRepository_->getIdleIncomes($user_id);
        return $idleIncome? $idleIncome : [];
    }

    public function getAllIncomes(int $user_id) {
        $Incomes = $this->incomeRepository_->getAllIncomes($user_id);
        return $Incomes;
    }
} 