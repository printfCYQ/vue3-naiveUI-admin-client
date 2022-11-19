<template>
  <div class="flex flex-col h-screen justify-center items-center bg-blue-300">
    <h2 class="text-blue-800 text-3xl pb-8">vue3-navieUI-admin</h2>
    <n-card class="w-3/5 max-w-lg bg-blue-100">
      <n-form ref="formRef" label-placement="left" label-align="left" :label-width="60" :model="formValue"
        :rules="rules" :show-require-mark="false">
        <n-form-item label="用户名" path="userName">
          <n-input v-model:value="formValue.userName" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input type="password" show-password-on="mousedown" placeholder="请输入密码"
            v-model:value="formValue.password" />
        </n-form-item>
        <n-form-item label="验证码" path="code">
          <div class="w-full flex justify-between">
            <n-input class="flex-1" v-model:value="formValue.code" placeholder="请输入验证码" />
            <img class="h-8 ml-2" style="" src="../../assets/code.svg" alt="">
          </div>
        </n-form-item>
        <n-form-item>
          <div class="w-full flex justify-center">
            <n-button class="w-9/12" attr-type="button" type="primary" @click="handleValidateClick">
              登陆
            </n-button>
          </div>
        </n-form-item>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import type { ConfigProviderProps, FormInst } from 'naive-ui';
import { createDiscreteApi, darkTheme, lightTheme } from 'naive-ui';
const formRef = ref<FormInst | null>(null)
const themeRef = ref<'light' | 'dark'>('light')
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: themeRef.value === 'light' ? lightTheme : darkTheme
}))
const { message } = createDiscreteApi(
  ['message'],
  {
    configProviderProps: configProviderPropsRef
  }
)
const formValue = ref({
  userName: '',
  password: '',
  code: ''
})
const rules = {
  userName: {
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

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success('Valid')
    } else {
      console.log(errors)
      message.error('Invalid')
    }
  })
}
</script>

<style scoped lang="scss">
div {
  a {
    color: red;
  }
}
</style>
