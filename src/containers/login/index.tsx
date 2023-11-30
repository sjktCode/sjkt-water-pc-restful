import { LockOutlined, MobileOutlined } from '@ant-design/icons';
import {
    LoginFormPage,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-components';
import { Tabs, message } from 'antd';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { omit } from 'lodash';

import { login, sendCodeMsg } from '@/graphql/auth';
import { AUTH_TOKEN } from '@/utils/constants';

import { useTitle } from '@/hooks';

import { useGetUser } from '@/hooks/userHooks';

import styles from './index.module.less';

interface IValue {
    tel: string;
    code: string;
    autoLogin: boolean;
}

const Login = () => {
    const [params] = useSearchParams();
    // const { store } = useUserContext();
    const userQuery = useGetUser();
    const nav = useNavigate();
    useTitle('登录');

    const loginHandler = async (values: IValue) => {
        login(omit(values, ['autoLogin']))
            .then((res: any) => {
                console.log('res', res);
                // store.refetchHandler?.();
                userQuery();
                if (values.autoLogin) {
                    sessionStorage.setItem(AUTH_TOKEN, '');
                    localStorage.setItem(AUTH_TOKEN, res.data.data);
                } else {
                    localStorage.setItem(AUTH_TOKEN, '');
                    sessionStorage.setItem(AUTH_TOKEN, res.data.data);
                }
                message.success('登录成功');
                nav(params.get('orgUrl') || '/');
            })
            .catch((err) => {
                console.log('loginHandler', err);
                message.error(err?.response?.data?.message);
            });
    };

    return (
        <div className={styles.container}>
            <LoginFormPage
                initialValues={{ tel: '18529501263' }}
                onFinish={loginHandler}
                backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
                logo="http://sjkt-water-assets.oss-cn-shanghai.aliyuncs.com/images/henglogo.png"
            >
                <Tabs
                    centered
                    items={[
                        {
                            key: 'phone',
                            label: '手机号登录',
                        },
                    ]}
                />

                <>
                    <ProFormText
                        fieldProps={{
                            size: 'large',
                            prefix: <MobileOutlined className="prefixIcon" />,
                        }}
                        name="tel"
                        placeholder="手机号"
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号！',
                            },
                            {
                                pattern: /^1\d{10}$/,
                                message: '手机号格式错误！',
                            },
                        ]}
                    />
                    <ProFormCaptcha
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className="prefixIcon" />,
                        }}
                        captchaProps={{
                            size: 'large',
                        }}
                        placeholder="请输入验证码"
                        captchaTextRender={(timing, count) => {
                            if (timing) {
                                return `${count} ${'获取验证码'}`;
                            }
                            return '获取验证码';
                        }}
                        phoneName="tel"
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码！',
                            },
                        ]}
                        onGetCaptcha={async (tel: string) => {
                            console.log('tel', tel);
                            sendCodeMsg(tel)
                                .then((res: any) => {
                                    console.log('res', res);
                                    message.success(res.data.message);
                                })
                                .catch((err: any) => {
                                    message.error(err?.response?.data?.message);
                                });
                        }}
                    />
                </>
                <div
                    style={{
                        marginBlockEnd: 24,
                    }}
                >
                    <ProFormCheckbox noStyle name="autoLogin">
                        自动登录
                    </ProFormCheckbox>
                </div>
            </LoginFormPage>
        </div>
    );
};

export default Login;
