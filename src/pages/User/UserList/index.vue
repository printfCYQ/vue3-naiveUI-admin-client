<template>
    <div>
        <n-form ref="formRef" label-placement="left" label-align="left" :label-width="60" :model="searchForm">
            <n-grid x-gap="12" :cols="4">
                <n-gi>
                    <n-form-item label="邮箱" path="email">
                        <n-input v-model:value="searchForm.email" placeholder="输入邮箱" />
                    </n-form-item>
                </n-gi>
                <n-gi>
                    <n-form-item label="用户名" path="user.userName">
                        <n-input v-model:value="searchForm.userName" placeholder="输入用户名" />
                    </n-form-item>
                </n-gi>
                <n-gi>
                    <n-form-item label="角色" path="roles">
                        <n-select v-model:value="searchForm.roles" filterable :options="roleList" />
                    </n-form-item>
                </n-gi>
                <n-gi>
                    <n-form-item>
                        <n-space>
                            <n-button type="info" attr-type="button" @click="handelSearch">
                                <template #icon>
                                    <n-icon>
                                        <SearchOutline />
                                    </n-icon>
                                </template>
                                查询
                            </n-button>
                            <n-button type="success" tertiary attr-type="button" @click="handelReset">
                                <template #icon>
                                    <n-icon>
                                        <RefreshSharp />
                                    </n-icon>
                                </template>
                                重置
                            </n-button>
                        </n-space>
                    </n-form-item>
                </n-gi>
            </n-grid>
        </n-form>
        <div class="py-4">
            <n-space>
                <n-button type="success" attr-type="button" @click="handelCreate">
                    <template #icon>
                        <n-icon>
                            <AddSharp />
                        </n-icon>
                    </template>
                    新建用户
                </n-button>
                <n-button type="warning" attr-type="button" @click="handelDeleteCheck">
                    <template #icon>
                        <n-icon>
                            <RemoveSharp />
                        </n-icon>
                    </template>
                    删除用户
                </n-button>
            </n-space>
        </div>
        <n-data-table :loading="loading" :bordered="false" :columns="columns" :data="userList" :row-key="rowKey"
            :pagination="paginationReactive" :checked-row-keys="checkData.list"
            @update:checked-row-keys="handleCheck" />
        <userFormModal ref="userFormModalRef"></userFormModal>
    </div>
</template>
  
<script lang="ts" setup>
import userApi from '@/api/user';
import type { IPaginationParams, IUserDelParams, IUserItemParams } from '@/api/user/types';
import { AddSharp, CreateOutline, RefreshSharp, RemoveSharp, SearchOutline } from '@vicons/ionicons5';
import type { DataTableColumns, DataTableRowKey } from 'naive-ui';
import { NButton, NIcon, NImage, NTag, useDialog, useMessage } from 'naive-ui';
import { h } from 'vue';
import useRoleList from '../hooks/roleList';
import userFormModal from './userFormModal.vue';


type searchFormType = {
    email?: string
    userName: string
    roles: Array<string>
}
const userFormModalRef = ref()

const rowKey = (row: IUserItemParams) => row.id

let searchForm = ref<searchFormType>({
    email: '',
    userName: '',
    roles: []
})
const { roleList } = useRoleList()


const createColumns = ({
    handelEdit,
    handelDelete
}: {
    handelEdit: (rowData: IUserItemParams) => void
    handelDelete: (rowData: IUserItemParams) => void
}): DataTableColumns<IUserItemParams> => {
    return [
        {
            type: 'selection',
        },
        {
            title: 'email',
            key: 'email'
        },
        {
            title: 'userName',
            key: 'userName'
        },
        {
            title: 'avatar',
            key: 'avatar',
            render(row) {
                return h(NImage, {
                    width: 80,
                    src: row.avatar,
                });
            }
        },
        {
            title: 'roles',
            key: 'roles',
            render(row) {
                const tags = row?.roles?.map((tagKey) => {
                    return h(
                        NTag,
                        {
                            style: {
                                marginRight: '6px'
                            },
                            type: 'info',
                            bordered: false
                        },
                        {
                            default: () => tagKey.roleName
                        }
                    )
                })
                return tags
            }
        },
        {
            title: 'Action',
            key: 'actions',
            render(row) {
                return [
                    h(
                        NButton,
                        {
                            size: 'small',
                            type: 'primary',
                            secondary: true,
                            onClick: () => handelEdit(row)
                        },
                        {
                            icon: () => h(NIcon, null, { default: () => h(CreateOutline) }),
                            default: () => '编辑'
                        },
                    ), h(
                        NButton,
                        {
                            style: { marginLeft: '10px' },
                            size: 'small',
                            type: 'warning',
                            secondary: true,
                            onClick: () => handelDelete(row)
                        },
                        {
                            icon: () => h(NIcon, null, { default: () => h(RemoveSharp) }),
                            default: () => '删除'
                        }
                    ),]
            }
        }
    ]
}


const paginationReactive = reactive({
    page: 1,
    pageSize: 10,
    pageCount: 10,
    showSizePicker: true,
    pageSizes: [5, 10, 20, 50],
    onChange: (page: number) => {
        paginationReactive.page = page
    },
    onUpdatePageSize: (pageSize: number) => {
        paginationReactive.pageSize = pageSize
        paginationReactive.page = 1
    }
})

const loading = ref<boolean>(false)

const message = useMessage()
const dialog = useDialog()

let userList = ref<Array<IUserItemParams>>([])

const checkData = reactive<{
    list: DataTableRowKey[]
}>({
    list: []
})

const columns = createColumns({
    handelEdit(rowData) {
        userFormModalRef.value.addForm.id = rowData.id
        userFormModalRef.value.addForm.email = rowData.email
        userFormModalRef.value.addForm.userName = rowData.userName
        userFormModalRef.value.addForm.avatar = rowData.avatar
        userFormModalRef.value.addForm.roles = rowData.roles?.map(item => item.id)
        userFormModalRef.value.previewFileList = [{ src: rowData.avatar }]
        userFormModalRef.value.showModal = true
    },
    handelDelete(rowData) {
        deleteFun([rowData.id as number])
    },
})

// 点击表格chexkbox
const handleCheck = (rowKeys: DataTableRowKey[]) => {
    checkData.list = rowKeys
}

// 批量删除
const handelDeleteCheck = () => {
    deleteFun(checkData.list as number[])
}

// 删除方法
const deleteFun = (ids: number[]) => {
    if (ids.length === 0) {
        message.warning('请选择数据')
        return
    }
    dialog.warning({
        title: '提示',
        content: '确定删除？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: async () => {
            const params: IUserDelParams = {
                ids
            }
            try {
                const res = await userApi.remove(params)
                message.success(res.message)
                checkData.list = []
                await getUsers()
            } catch (error: any) {
                message.error(error)
            }
        },
    })
}


const handelCreate = () => {
    userFormModalRef.value.showModal = true
}

onMounted(async () => {
    await getUsers()
})


const getUsers = async () => {
    const params: IPaginationParams = {
        page: paginationReactive.page,
        pageSize: paginationReactive.pageSize
    }
    loading.value = true
    try {
        const res = await userApi.users(params)
        userList.value = res.data.userList
        paginationReactive.pageCount = res.data.total
    } catch (error: any) {
        message.error(error)
        loading.value = false
    }
    loading.value = false

}

const handelSearch = () => {
    console.log(searchForm);
}
const handelReset = () => {
    searchForm.value = {
        email: '',
        userName: '',
        roles: ['']
    }
}

provide("userProvide", {
    getUsers
});
</script>