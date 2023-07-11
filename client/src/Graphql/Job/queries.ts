import { gql } from "@apollo/client";

export const GETFIVEJOBS = gql`
    query GetFiveJobs($user_id: ID!){
        fiveJobs(user_id: $user_id){
            wage
            description
            establishment
        }
    }
`;

export const GETJOBS = gql`
    query GetJobs($user_id: ID!, $first: Int!){
        jobs(user_id: $user_id, first: $first){
            data{
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