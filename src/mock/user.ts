import type { MockMethod } from 'vite-plugin-mock';

const appMocks: MockMethod[] = [
    {
        url: '/mock/api/v1/login',
        method: 'post',
        timeout: 1000,
        response: (req: any) => {
            const data = req.body;
            if (data.email === 'admin@qq.com' && data.password === 'admin' && data.code === '1234') {
                return {
                    code: 200,
                    msg: '',
                    data: {
                        token: 'admin'
                    }
                };
            }

        }
    }, {
        url: '/mock/api/v1/getCurrentUser',
        method: 'get',
        timeout: 1000,
        response: () => {
            return {
                code: 200,
                msg: '',
                data: {
                    userName: "admin",
                    email: "admin@qq.com",
                    avatar: null,
                    role: [
                        "635e0ab3268f6871381ad9d1"
                    ],
                    createdAt: "2022-10-31T12:06:25.407Z",
                    updatedAt: "2022-10-31T12:06:25.407Z",
                    permissions: [
                        "dashboard",
                        "user:list",
                        "user:list:create"
                    ]
                }
            }
        }
    }
];

export default appMocks;
