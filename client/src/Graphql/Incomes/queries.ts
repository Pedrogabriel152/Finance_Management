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

export const GETACTIVEJOBS = gql`
    query ActiveJobs($user_id: ID!, $first: Int!) {
        getActiveJobs(user_id: $user_id, first: $first){
            data{
                id
                establishment
                wage
                active
            }
            paginatorInfo{
                count
                currentPage
                lastPage
            }
        }
    }
`;

export const GETIDLEJOBS = gql`
    query IdleJobs($user_id: ID!, $first: Int!) {
        getIdleJobs(user_id: $user_id, first: $first){
            data{
                id
                establishment
                wage
                active
            }
            paginatorInfo{
                count
                currentPage
                lastPage
            }
        }
    }
`;