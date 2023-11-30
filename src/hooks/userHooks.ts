import { useLocation, useNavigate } from 'react-router-dom';

import { getCurrentUser } from '@/graphql/user';

import { connectFactory, useAppContext } from '../utils/contextFactory';
import { IUser } from '../utils/types';

const KEY = 'userinfo';
const DEFAULT_VALUE = {};
export const useUserContext = () => useAppContext<IUser>(KEY);
export const connect = connectFactory(KEY, DEFAULT_VALUE);
export const useGetUser = () => {
    const { setStore } = useUserContext();
    const nav = useNavigate();
    const location = useLocation();

    const handleCompleted = (data: IUser) => {
        if (data) {
            const { id, name, tel, desc, avatar } = data;
            console.log('getUserInfo', 'getUserInfo');
            setStore({
                id,
                name,
                tel,
                desc,
                avatar,
                // refetchHandler: refreshQuery,
            });
            // 当前在登录页面，且已经登录了，那就直接跳到首页
            if (location.pathname === '/login') {
                nav('/');
            }
            return;
        }
        console.log('onCompleted', 'onCompleted');
        // setStore({ refetchHandler: refreshQuery });
        if (location.pathname !== '/login') {
            nav(`/login?orgUrl=${location.pathname}`);
        }
    };
    const refreshQuery = async () => {
        try {
            const response = await getCurrentUser();
            console.log('refreshQuery', response);
            handleCompleted(response.data);
        } catch (error) {
            console.log('onError', 'onError');
            // setStore({ refetchHandler: refreshQuery });
            if (location.pathname !== '/login') {
                console.log('onError', location.pathname);
                nav(`/login?orgUrl=${location.pathname}`);
            }
        }
    };
    return refreshQuery;
};
