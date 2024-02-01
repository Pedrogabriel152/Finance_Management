<?php

namespace App\Helpers;

use DateTime;

class Helpers {
    public static function organizeFinance($finances, array $financesMonths, $jobs = null){ 
        foreach ($finances as $key => $finance) {
            $monthsPaids = unserialize($finance->months_paid);
            $dateExpires = new DateTime($finance->expires);
        
            foreach ($monthsPaids as $keyMonthPaid => $monthPaid) {
                foreach ($financesMonths as $keyFinance => $financeMonth) {
                    $yearFinanceMonth = date('Y', strtotime($financeMonth['year']));
                    $dateExpires = DateTime::createFromFormat('d/m/Y', $monthPaid['expires']);
                    $maxDate = DateTime::createFromFormat('d/m/Y', '28/'.$financeMonth['month'].'/'.$yearFinanceMonth);
                    $minDate = DateTime::createFromFormat('d/m/Y', '01/'.$financeMonth['month'].'/'.$yearFinanceMonth);

                    if($dateExpires >= $minDate && $dateExpires <= $maxDate){
                        $financeMonths[$keyFinance]['total'] = floatval($financeMonth['total']) + floatval($financeMonth->value_installment);
                    }

                    if(!key_exists($keyMonthPaid + 1, $monthsPaids)){
                        $dateExpires = new DateTime($finance->expires);

                        if($dateExpires >= $minDate && $dateExpires <= $maxDate){
                            $financeMonths[$keyFinance]['total'] = floatval($financeMonth['total']) + floatval($finance->value_installment);  
                        }
                    
                    }                     
                }
            }
        }

        if($jobs){
            foreach ($jobs as $key => $job) {
                foreach ($financesMonths as $keyFinance => $financeMonth) {   
                    $date = $financeMonth['year']."-".$financeMonth['month'].'-01';
                    $dateStartedMonth = date('m-Y', strtotime($date));
                    $dateStartedJob = date('m-Y',  strtotime($job->started));
    
                    if($dateStartedMonth >= $dateStartedJob){
                        if($job->leave) {
                            $monthLeaved = date('m-Y', strtotime($job->leave));
                            $dateLeaveddMonth = date('m-Y', strtotime($financeMonth['year']."-".$financeMonth['month']."-30"));
                
                            if($monthLeaved >= $dateLeaveddMonth) {
                                $financesMonths[$keyFinance]['total'] = floatval($financeMonth['total']) + floatval($job->wage);
                            }
                        } 
    
                        if(!$job->leave) {
                            $financesMonths[$keyFinance]['total'] = floatval($financeMonth['total']) + floatval($job->wage);
                        }
                    }                 
                }
            }
        }
        return $financesMonths;
    }
}