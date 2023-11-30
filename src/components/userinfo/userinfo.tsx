import { Spin } from 'antd';

import { useEffect, useState } from 'react';

import { IPropChild } from '@/utils/types';
import { useGetUser } from '@/hooks/userHooks';

/**
 * 获取用户信息组件
 */
const UserInfo = ({ children }: IPropChild) => {
    const [loading, setLoading] = useState(true);
    const userQuery = useGetUser();
    useEffect(() => {
        userQuery().finally(() => {
            console.log('UserInfo', 'userQuery success');
            setLoading(false);
        });
    }, []);
    return (
        <Spin spinning={loading}>
            <div style={{ height: '100vh' }}>{children}</div>
        </Spin>
    );
};

export default UserInfo;
