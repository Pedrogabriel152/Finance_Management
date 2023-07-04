import { gql } from "@apollo/client";

export const GETFINANCE= gql`
   query GetFinance($user_id: ID!){
        getFiveExpense(user_id: $user_id){
            installments
            installments_paid
            merchandise_purchased
            value_installment
        }

        getFiveIncomes(user_id: $user_id){
            installments
            installments_received
            merchandise_purchased
            value_installment
        }
    }
`;

export const GETFINANCIALSUMMARY = gql`
    query GetFinancialSummary($user_id: ID!) {
        totalIncomes(user_id: $user_id){
            total
            totalIncomes
        }

        totalExpenses(user_id: $user_id){
            total
            totalExpenses
        }
    }
`;

export const GETMONTHLYSUMMARY = gql`
    query GetExpenseMonth($user_id: ID!){
        searchExpensesMonth(user_id: $user_id) {
            total
            month
        }

        searchIncomesMonth(user_id: $user_id){
            month
            total
        }
    }
`;
