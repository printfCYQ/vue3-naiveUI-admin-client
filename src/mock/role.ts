import Mock from "mockjs";
import type { MockMethod } from "vite-plugin-mock";
const appMocks: MockMethod[] = [
    {
        url: "/mock/api/v1/roles", // 角色列表
        method: "get",
        timeout: 1000,
        response: () => {
            const { list } = Mock.mock({
                "list|15-30": [
                    {
                        "id|+1": 1,
                        roleName: "@cname()",
                    },
                ],
            });
            return {
                code: 200,
                message: "",
                data: {
                    roleList: list,
                    totle: list.length,
                },
            };
        },
    },
    {
        url: "/mock/api/v1/role/create", // 新建角色
        method: "post",
        timeout: 1000,
        response: () => {
            return {
                code: 200,
                message: "新建成功",
                data: {},
            };
        },
    },
    {
        url: "/mock/api/v1/role/update", // 编辑用户
        method: "post",
        timeout: 1000,
        response: () => {
            return {
                code: 200,
                message: "编辑成功",
                data: {},
            };
        },
    },
    {
        url: "/mock/api/v1/role/del", // 删除角色
        method: "post",
        timeout: 1000,
        response: () => {
            return {
                code: 200,
                message: "删除成功",
                data: {},
            };
        },
    },
];

export default appMocks;
