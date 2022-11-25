<template>
    <div class="h-screen flex justify-center items-center">
        <n-result :status="status" :title="title" :description="description">
            <template #footer>
                <n-button @click="handelBack">返回首页</n-button>
            </template>
        </n-result>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"

const router = useRouter()

defineProps<{
    status: string,
    title: string,
    description: string
}>()

const handelBack = () => {
    router.push('/dashboard')
}
</script>