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

export const CREATEJOB = gql`
    mutation CreateJob($job: JobInput!){
        createJob(job: $job){
            code
            message
        }
    }
`;