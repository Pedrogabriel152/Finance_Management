import { gql } from "@apollo/client";

export const GETEXPENSES = gql`
    query GetExpenses($user_id: ID!, $first: Int!){
        getAllExpense(user_id: $user_id, first: $first){
            data{
                id
                establishment
                expires
                value_installment
                installments_paid
            }
            paginatorInfo{
                count
                currentPage
                lastPage
            }
        }
    }
`;

export const GETACTIVEEXPENSES = gql`
    query ActiveExpenses($user_id: ID!, $first: Int!) {
        getActiveExpense(user_id: $user_id, first: $first){
            data{
                id
                establishment
                expires
                value_installment
                installments_paid
            }
            paginatorInfo{
                count
                currentPage
                lastPage
            }
        }
    }
`;

export const GETIDLEEXPENSES = gql`
    query IdleExpenses($user_id: ID!, $first: Int!) {
        getIdleExpense(user_id: $user_id, first: $first){
            data{
                id
                establishment
                expires
                value_installment
                installments_paid
            }
            paginatorInfo{
                count
                currentPage
                lastPage
            }
        }
    }
`;