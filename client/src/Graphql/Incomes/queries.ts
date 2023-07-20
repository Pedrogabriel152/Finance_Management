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
        getActiveIncomes(user_id: $user_id, first: $first){
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
        getIdleIncomes(user_id: $user_id, first: $first){
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