import { gql } from "@apollo/client";

export const GETINCOMES = gql`
    query GetIncomes($user_id: ID!, $first: Int!){
        getAllIncomes(user_id: $user_id, first: $first){
            data{
                id
                establishment
                expires
                value_installment
                received_income
            }
            paginatorInfo{
                count
                currentPage
                lastPage
            }
        }
    }
`;

export const GETACTIVEINCOMES = gql`
    query ActiveIncomes($user_id: ID!, $first: Int!) {
        incomesOpen(user_id: $user_id, first: $first){
            data{
                id
                establishment
                expires
                value_installment
                received_income
            }
            paginatorInfo{
                count
                currentPage
                lastPage
            }
        }
    }
`;

export const GETIDLEINCOMES = gql`
    query IdleIncomes($user_id: ID!, $first: Int!) {
        incomesClose(user_id: $user_id, first: $first){
            data{
                id
                establishment
                expires
                value_installment
                received_income
            }
            paginatorInfo{
                count
                currentPage
                lastPage
            }
        }
    }
`;

export const CREATEINCOME = gql`
    mutation CreateIncome($income: IncomeInput!){
        createIncome(income: $income){
            code
            message
        }
    }
`;

export const GETINCOME = gql`
    query GetIncome($id: ID!, $user_id: ID!){
        income(id: $id, user_id: $user_id){
            id
            description
            establishment 
            merchandise_purchased
            installments
            value_installment
            expires
            installments_received
            received_income
            user_id  
        }
    }
`;

export const UPDATEINCOME = gql`
    mutation EditIncome($id: ID!, $user_id: ID!, $income: IncomeInput!){
        editIncome(id: $id, user_id: $user_id, income: $income){
            code
            message
        }
    }
`;

export const PAYINSTALLMENT= gql`
    mutation PayInstallmentIncome($id: ID!, $user_id: ID!){
        payInstallmentIncome(id: $id, user_id: $user_id){
            code
            message
        }
    }
`;