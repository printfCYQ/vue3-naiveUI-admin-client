import type { MockMethod } from 'vite-plugin-mock';
const appMocks: MockMethod[] = [
    {
        url: '/mock/api/v1/file', // 文件
        method: 'post',
        timeout: 1000,
        response: () => {
            return {
                code: 200,
                message: '',
                data: {
                    url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
                }
            };

        }
    }
];

export default appMocks;