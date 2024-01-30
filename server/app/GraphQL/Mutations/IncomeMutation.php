<?php

namespace App\GraphQL\Mutations;

use App\Services\IncomeService;

class IncomeMutation
{

    private IncomeService $incomeService_;
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    public function __construct()
    {
        $this->incomeService_ = new IncomeService();
    }

    // Create Income
    public function createIncome($_, array $args)
    {
        $response = $this->incomeService_->createIncome($args);
        return $response;
    }

    // Update Income
    public function editIncome($_, array $args)
    {
        $response = $this->incomeService_->editIncome($args);
        return $response;
    }

    // Update Installment paid
    public function payInstallment($_, array $args)
    {
        $response = $this->incomeService_->payInstallment($args);
        return $response;
    }
    
}
