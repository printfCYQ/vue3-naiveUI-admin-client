<template>
    <n-modal v-model:show="showModal" :close-on-esc="false" :mask-closable="false" preset="card" :style="bodyStyle"
        title="新建" size="huge" :bordered="false" :segmented="segmented" @close="handleClose">
        <n-form ref="formRef" label-placement="top" label-align="left" :label-width="70" :rules="rules"
            :model="addForm">
            <n-form-item label="角色名" path="roleName">
                <n-input v-model:value="addForm.roleName" placeholder="输入角色名" />
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
import roleApi from '@/api/role';
import type { IRoleItemParams } from '@/api/role/types';
import { CloseCircleOutline, CloudDoneOutline } from '@vicons/ionicons5';
import type { FormInst } from 'naive-ui';
import { useMessage } from 'naive-ui';
const roleProvide: any = inject("RoleProvide");
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
    roleName: {
        required: true,
        message: '请输入角色名',
        trigger: ['blur', 'input']
    },
}
const formRef = ref<FormInst | null>(null)
const showModal = ref<boolean>(false)
const loading = ref<boolean>(false)


const addForm = ref<IRoleItemParams>({
    roleName: '',
})


// 保存按钮
const handelSubmit = () => {
    console.log(addForm.value);
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            loading.value = true
            try {
                const res = await roleApi.create(addForm.value)
                message.success(res.message)
                handelCancel()
                roleProvide.getRoles() // 调用父组件方法
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
        roleName: '',
    }
    loading.value = false
}

// X 按钮
const handleClose = () => {
    handelCancel()
}

defineExpose({
    showModal
})
</script>