import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!){
        login(email: $email, password: $password){
            code
            token
            message
            user_id
        }
    }
`;

export const REGISTER = gql`
    mutation Register($user: UserInput!){
        createUser(user: $user){
            code
            token
            message
            user_id
        }
    }
`;

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

// export const DELETE_TASK = gql`
//     mutation deleteTask($id: ID!){
//         deleteTask(id: $id){
//                 code
//                 message
//             }
//         }
// `;

// export const EDIT_TASK = gql`
//     mutation UpdateTask($id: ID!, $task: TaskInput){
//         updateTask(id: $id, task: $task){
//             code
//             message
//         }
//     }
// `;