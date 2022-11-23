<template>
  <div class="flex flex-col h-screen justify-center items-center bg-blue-300">
    <h2 class="text-blue-800 text-3xl pb-8">vue3-navieUI-admin</h2>
    <n-card class="w-3/5 max-w-lg bg-blue-100">
      <n-form ref="formRef" label-placement="left" label-align="left" :label-width="60" :model="loginForm"
        :rules="rules" :show-require-mark="false">
        <n-form-item label="用户名" path="email">
          <n-input v-model:value="loginForm.email" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input type="password" show-password-on="mousedown" placeholder="请输入密码"
            v-model:value="loginForm.password" />
        </n-form-item>
        <n-form-item label="验证码" path="code">
          <div class="w-full flex justify-between">
            <n-input class="flex-1" v-model:value="loginForm.code" placeholder="请输入验证码" />
            <img class="h-8 ml-2" style="" src="../../assets/code.svg" alt="">
          </div>
        </n-form-item>
        <n-form-item>
          <div class="w-full flex justify-center">
            <n-button class="w-9/12" attr-type="button" type="primary" :loading="loading" @click="handleValidateClick">
              登陆
            </n-button>
          </div>
        </n-form-item>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import type { ILoginParams } from '@/api/user/types';
import { useAppStore, useUserStore } from '@/store';
import type { FormInst } from 'naive-ui';
import { useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';
import axios from "axios";

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const message = useMessage()

const formRef = ref<FormInst | null>(null)
let loading = ref<boolean>(false) // 按钮loading

// 登陆表达form
const loginForm = ref<ILoginParams>({
  email: 'admin@qq.com',
  password: 'admin',
  code: '1234'
})

// 表单校验规则
const rules = {
  email: {
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: ['input', 'blur']
  },
  code: {
    required: true,
    message: '请输入验证码',
    trigger: ['input']
  }
}

// 登陆按钮
const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault()

  // axios.get('/login').then(res => {
  //   console.log(res);
  // })
  // return
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true
      try {
        await appStore.login(loginForm.value)
        await userStore.getCurrentUserInfo()
        message.success('登陆成功')
        router.push('/')
      } catch (error: any) {
        loading.value = false
        message.error(error?.message ?? '未知错误')
      }
    }
  })
  loading.value = false
}

// onMounted(() => {
//   axios.get('/createUser').then((res: any) => {
//     console.log(res);
//   });
// });
</script>
