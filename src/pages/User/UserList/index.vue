<template>
    <div>
        <n-space vertical>
            <n-input v-model:value="value" type="text" placeholder="基本的 Input" />
            <n-input v-model:value="value" type="textarea" placeholder="基本的 Textarea" />
        </n-space>
        <n-h2 v-for="item in 20" :key="item" type="error">
            用户列表
        </n-h2>
    </div>
</template>

<script setup lang="ts">
const value = ref('')

</script>

<style scoped>

</style>