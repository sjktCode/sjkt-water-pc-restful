import { gql } from '@apollo/client';

import axios from '@/utils/axios';
import { ILoginReq } from '@/utils/types';

export const SEND_CODE_MSG = gql`
    mutation sendCodeMsg($tel: String!) {
        sendCodeMsg(tel: $tel) {
            code
            message
        }
    }
`;

export const sendCodeMsg = (tel: string) => axios.get(`/auth/${tel}`);

export const LOGIN = gql`
    mutation login($tel: String!, $code: String!) {
        login(tel: $tel, code: $code) {
            code
            message
            data
        }
    }
`;

export const login = (req: ILoginReq) => axios.post('/auth/login', req);
