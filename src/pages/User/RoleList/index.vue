<template>
    <div>
        <n-form ref="formRef" label-placement="left" label-align="left" :label-width="60" :model="searchForm">
            <n-grid x-gap="12" cols="4" responsive="screen" item-responsive>
                <n-gi>
                    <n-form-item label="角色名" path="email">
                        <n-input v-model:value="searchForm.roleName" placeholder="输入角色名" />
                    </n-form-item>
                </n-gi>
                <n-gi span="0 m:1 l:2">
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
                    新建角色
                </n-button>
                <n-button type="warning" attr-type="button" @click="handelDeleteCheck">
                    <template #icon>
                        <n-icon>
                            <RemoveSharp />
                        </n-icon>
                    </template>
                    删除角色
                </n-button>
            </n-space>
        </div>
        <n-data-table :loading="loading" :bordered="false" :columns="columns" :data="roleList" :row-key="rowKey"
            :pagination="paginationReactive" :checked-row-keys="checkData.list"
            @update:checked-row-keys="handleCheck" />
        <roleFormModal ref="roleFormModalRef"></roleFormModal>
    </div>
</template>
  
<script lang="ts" setup>
import roleApi from '@/api/role';
import type { IRoleDelParams, IRoleItemParams, IRoleListParams } from '@/api/role/types';
import { AddSharp, RefreshSharp, RemoveSharp, SearchOutline } from '@vicons/ionicons5';
import type { DataTableColumns, DataTableRowKey } from 'naive-ui';
import { NButton, NIcon, NInput, useDialog, useMessage } from 'naive-ui';
import { h } from 'vue';
import roleFormModal from './roleFormModal.vue';


type searchFormType = {
    roleName: string
}
const roleFormModalRef = ref()

const rowKey = (row: IRoleItemParams) => row.id

let searchForm = ref<searchFormType>({
    roleName: ''
})

const ShowOrEdit = defineComponent({
    props: {
        value: [String, Number],
        onUpdateValue: [Function, Array]
    },
    setup(props) {
        const isEdit = ref(false)
        const inputRef = ref()
        const inputValue = ref(props.value)
        function handleOnClick() {
            isEdit.value = true
            nextTick(() => {
                inputValue.value = props.value
                inputRef.value.focus()
            })
        }
        function handleChange() {
            //@ts-ignore
            props.onUpdateValue(inputValue.value)
            isEdit.value = false
        }
        return () =>
            h(
                'div',
                {
                    onClick: handleOnClick
                },
                //@ts-ignore
                isEdit.value ? h(NInput, {
                    ref: inputRef,
                    value: inputValue.value,
                    onUpdateValue: (v: string) => {
                        inputValue.value = v
                    },
                    // onChange: handleChange,
                    onBlur: handleChange
                }) : props.value
            )
    }
})

const createColumns = ({
    handelDelete
}: {
    handelDelete: (rowData: IRoleItemParams) => void
}): DataTableColumns<IRoleItemParams> => {
    return [
        {
            type: 'selection',
        },
        {
            title: 'roleName',
            key: 'roleName',
            render(row, index) {
                return h(ShowOrEdit, {
                    value: row.roleName,
                    onUpdateValue(v: string) {
                        console.log(row.roleName, v);
                        if (row.roleName !== v) {
                            handelUpdate({ id: row.id, roleName: v })
                        }
                    }
                })
            }
        },
        {
            title: 'Action',
            key: 'actions',
            width: 200,
            render(row) {
                return h(
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
                )
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
        getRoles()
    },
    onUpdatePageSize: (pageSize: number) => {
        paginationReactive.pageSize = pageSize
        paginationReactive.page = 1
        getRoles()
    }
})

const loading = ref<boolean>(false)

const message = useMessage()
const dialog = useDialog()

let roleList = ref<Array<IRoleItemParams>>([])

const checkData = reactive<{
    list: DataTableRowKey[]
}>({
    list: []
})

const columns = createColumns({
    handelDelete(rowData) {
        deleteFun([rowData.id as number])
    }
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
    const d = dialog.warning({
        title: '提示',
        content: '确定删除？',
        positiveText: '确定',
        negativeText: '取消',
        closable: false,
        onPositiveClick: async () => {
            d.loading = true
            const params: IRoleDelParams = {
                ids
            }
            try {
                const res = await roleApi.remove(params)
                message.success(res.message)
                checkData.list = []
                await getRoles()
            } catch (error: any) {
                message.error(error)
            }
        },
    })
}


const handelCreate = () => {
    roleFormModalRef.value.showModal = true
}

const handelUpdate = async (params: IRoleItemParams) => {
    try {
        const res = await roleApi.update(params)
        message.success(res.message)
        await getRoles()
    } catch (error: any) {
        message.error(error)
        loading.value = false
    }
}

onMounted(async () => {
    await getRoles()

})


const getRoles = async () => {
    const params: IRoleListParams = {
        page: paginationReactive.page,
        pageSize: paginationReactive.pageSize,
        ...searchForm.value
    }
    loading.value = true
    try {
        const res = await roleApi.roles(params)
        roleList.value = res.data.roleList
        paginationReactive.pageCount = res.data.total
    } catch (error: any) {
        message.error(error)
        loading.value = false
    }
    loading.value = false

}

const handelSearch = async () => {
    console.log(searchForm);
    await getRoles()
}
const handelReset = () => {
    searchForm.value = {
        roleName: ''
    }
}

provide("RoleProvide", {
    getRoles
});
</script>