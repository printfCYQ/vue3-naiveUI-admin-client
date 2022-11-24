import Mock, { Random } from "mockjs";
import type { MockMethod } from "vite-plugin-mock";
const appMocks: MockMethod[] = [
    {
        url: "/mock/api/v1/login", // 登陆
        method: "post",
        timeout: 1000,
        response: (req: any) => {
            const data = req.body;
            if (
                data.email === "admin@qq.com" &&
                data.password === "admin" &&
                data.code === "1234"
            ) {
                return {
                    code: 200,
                    message: "",
                    data: {
                        token: "admin",
                    },
                };
            }
        },
    },
    {
        url: "/mock/api/v1/getCurrentUser", // 获取登陆用户信息
        method: "get",
        timeout: 1000,
        response: () => {
            return {
                code: 200,
                message: "",
                data: {
                    userName: "admin",
                    email: "admin@qq.com",
                    avatar: null,
                    role: ["635e0ab3268f6871381ad9d1"],
                    createdAt: "2022-10-31T12:06:25.407Z",
                    updatedAt: "2022-10-31T12:06:25.407Z",
                    permissions: ["dashboard", "user:list", "user:list:create"],
                },
            };
        },
    },
    {
        url: "/mock/api/v1/users", // 获取登陆用户信息
        method: "get",
        timeout: 1000,
        response: () => {
            const { list } = Mock.mock({
                "list|15-30": [
                    {
                        "id|+1": 1,
                        email: "@email(163.com)",
                        userName: "@cname()",
                        avatar: function () {
                            return Random.image("36x36", "#d8d8d8", "#000", "png", "Logo");
                        },
                        roles: [],
                    },
                ],
            });
            list.map((item: any, index: number) => {
                item.roles =
                    index % 2 === 0
                        ? [
                            { id: "1", roleName: "admin" },
                            { id: "2", roleName: "admin2" },
                        ]
                        : [{ id: "1", roleName: "admin" }];
            });
            return {
                code: 200,
                message: "",
                data: {
                    userList: list,
                    totle: list.length,
                },
            };
        },
    },
    {
        url: "/mock/api/v1/user/create", // 新建用户
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
        url: "/mock/api/v1/user/update", // 编辑用户
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
        url: "/mock/api/v1/user/del", // 删除用户
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
