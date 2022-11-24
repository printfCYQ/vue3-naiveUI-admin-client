<template>
    <n-modal v-model:show="showModal" :close-on-esc="false" :mask-closable="false" preset="card" :style="bodyStyle"
        :title="addForm.id === -1 ? '新建' : '编辑'" size="huge" :bordered="false" :segmented="segmented"
        @close="handleClose">
        <n-form ref="formRef" label-placement="top" label-align="left" :label-width="70" :rules="rules"
            :model="addForm">
            <n-form-item label="邮箱" path="email">
                <n-input v-model:value="addForm.email" placeholder="输入邮箱" />
            </n-form-item>
            <n-form-item label="用户名" path="userName">
                <n-input v-model:value="addForm.userName" placeholder="输入用户名" />
            </n-form-item>
            <n-form-item label="头像" path="avatar" ref="uploadRef">
                <n-upload :action="uploadUrl" :max="1" :default-file-list="previewFileList" list-type="image-card"
                    @preview="handlePreview" @finish="handelFinish" @error="handelError" />
            </n-form-item>
            <n-form-item label="角色" path="roles">
                <n-select v-model:value="addForm.roles" multiple filterable :options="roleList" />
            </n-form-item>
        </n-form>
        <template #footer>
            <div class="flex justify-end">
                <n-space>
                    <n-button type="info" attr-type="button" :loading="loading" @click="handelSubmit">
                        <template #icon>
                            <n-icon>
                                <CloudDoneOutline />
                            </n-icon>
                        </template>
                        保存
                    </n-button>
                    <n-button type="success" tertiary attr-type="button" :loading="loading" @click="handelCancel">
                        <template #icon>
                            <n-icon>
                                <CloseCircleOutline />
                            </n-icon>
                        </template>
                        取消
                    </n-button>
                </n-space>
            </div>
        </template>
    </n-modal>
</template>

<script setup lang="ts">
import { uploadUrl } from '@/api/file/index';
import userApi from '@/api/user';
import type { IUserItemParams } from '@/api/user/types';
import { CloseCircleOutline, CloudDoneOutline } from '@vicons/ionicons5';
import type { FormInst, UploadFileInfo } from 'naive-ui';
import { useMessage } from 'naive-ui';
import useRoleList from '../hooks/roleList';
const userProvide: any = inject("userProvide");
const { roleList } = useRoleList()
const message = useMessage()

const bodyStyle = {
    width: '60%'
}
const segmented = {
    content: 'soft',
    footer: 'soft'
}


// 表单校验规则
const rules = {
    email: {
        required: true,
        message: '请输入邮箱',
        trigger: ['blur', 'input']
    },
    userName: {
        required: true,
        message: '请输入用户名',
        trigger: ['blur', 'input']
    },
    avatar: {
        required: true,
        message: '请上传头像',
    },
    roles: {
        type: 'array',
        required: true,
        message: '请选择角色',
        trigger: ['blur', 'change']
    }
}
const formRef = ref<FormInst | null>(null)
const uploadRef = ref<FormInst | null>(null)
const showModal = ref<boolean>(false)
const loading = ref<boolean>(false)

const previewFileList = ref<UploadFileInfo[]>([])

const addForm = ref<IUserItemParams>({
    id: -1,
    email: '',
    userName: '',
    roles: [],
    avatar: ''
})


// 保存按钮
const handelSubmit = () => {
    console.log(addForm.value);
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            loading.value = true
            if (addForm.value.id === -1) {
                delete addForm.value.id
            }
            const funName = addForm.value.id ? 'update' : 'create'
            try {
                const res = await userApi[funName](addForm.value)
                message.success(res.message)
                handelCancel()
                userProvide.getUsers() // 调用父组件方法
            } catch (error: any) {
                message.error(error)
                loading.value = false
            }
        }
    })
    loading.value = false
}

// 取消按钮
const handelCancel = () => {
    showModal.value = false
    addForm.value = {
        email: '',
        userName: '',
        roles: [],
        avatar: ''
    }
    previewFileList.value = []
    loading.value = false
}

// X 按钮
const handleClose = () => {
    handelCancel()
}

// 预览图片
const handlePreview = () => {

}

// 上传结束
const handelFinish = (file: UploadFileInfo) => {
    //@ts-ignore
    const res = JSON.parse(file?.event?.currentTarget.response)
    addForm.value.avatar = res.data.url
    uploadRef.value?.restoreValidation() // 隐藏avatar的检验提示显示
}

// 上传失败
const handelError = (file: UploadFileInfo) => {
    message.error(`${file?.file?.name}上传失败`)
}

defineExpose({
    showModal,
    addForm,
    previewFileList
})
</script>

<style scoped>

</style>