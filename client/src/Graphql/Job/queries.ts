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
// query GetTotalIncomes($user_id: ID!){
//     totalIncomes(user_id: $user_id){
//         total
//         totalIncomes
//     }

//     totalExpenses(user_id: $user_id){
//         total
//         totalExpenses
//     }
// }
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