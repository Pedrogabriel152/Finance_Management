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

// export const CREATE_TASK= gql`
//     mutation CreateTask($descricao: String!){
//         createTask(descricao: $descricao){
//             code
//             message
//             task{
//                 id
//                 descricao
//                 status
//             }
//         }
//     }
// `;

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