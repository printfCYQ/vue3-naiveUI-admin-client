// 权限名
export enum PermissionEnum {
    DASHBOARD = '/dashboard',
    USER = '/user',
    USER_LIST = '/user/list',
    USER_LIST_CREATE = '/user/list/create',
    USER_LIST_DELETE = '/user/list/delete',
    USER_LIST_EDIT = '/user/list/edit',
    ROLE_LIST = '/role/list',
    ROLE_LIST_CREATE = '/role/list/create',
    ROLE_LIST_DELETE = '/role/list/delete',
    ROLE_LIST_EDIT = '/role/list/edit',
}


type PermissionsTree = {
    label: string;
    value: string;
    children?: Array<PermissionsTree>;
};

export const permissionsTree: Array<PermissionsTree> = [
    { label: "控制台", value: PermissionEnum.DASHBOARD },
    {
        label: "用户",
        value: PermissionEnum.USER,
        children: [
            {
                label: "用户管理",
                value: PermissionEnum.USER_LIST,
                children: [
                    { label: "用户创建", value: PermissionEnum.USER_LIST_CREATE },
                    { label: "用户删除", value: PermissionEnum.USER_LIST_DELETE },
                    { label: "用户编辑", value: PermissionEnum.USER_LIST_EDIT },
                ],
            },
            {
                label: "角色管理",
                value: PermissionEnum.ROLE_LIST,
                children: [
                    { label: "角色创建", value: PermissionEnum.ROLE_LIST_CREATE },
                    { label: "角色删除", value: PermissionEnum.ROLE_LIST_DELETE },
                    { label: "角色编辑", value: PermissionEnum.ROLE_LIST_EDIT },
                ],
            },
        ],
    },
];

const flatPermissionsTree = (permissionsTree: Array<PermissionsTree>) => {
    const list: any = []
    permissionsTree.map((item: PermissionsTree) => {
        if (item.children) {
            list.push(...flatPermissionsTree(item.children))
        }
        list.push({
            label: item.label,
            value: item.value
        })
    })

    return list
}

const getNameObj = () => {
    let obj: any = {}
    flatPermissionsTree(permissionsTree).map((item: any) => {
        obj[item.value] = item.label
    })
    return obj
}
export const permissionsNameObj = getNameObj()

