import { gql } from '@apollo/client';

import axios from '@/utils/axios';

export const GET_USER = gql`
    query getUserInfo {
        getUserInfo {
            id
            tel
            desc
            name
            avatar
        }
    }
`;

export const getCurrentUser = () => axios.get('/users/currentUser');

export const UPDATE_USER = gql`
    mutation updateUserInfo($id: String!, $params: UserInput!) {
        updateUserInfo(id: $id, params: $params) {
            code
            message
        }
    }
`;
