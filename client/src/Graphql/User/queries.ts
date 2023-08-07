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

export const GETUSER = gql`
    query getUser{
        user{
            address
            cpf 
            email
            id
            name
            phone
        }
    }
`;

export const EDITUSER = gql`
    mutation EditUser($id: ID!, $user: UserInput!){
        editUser(id: $id, user: $user){
            code
            message
        }
    }
`;