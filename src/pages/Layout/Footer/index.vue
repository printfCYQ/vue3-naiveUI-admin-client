<template>
    <div>
        <n-layout-footer bordered :position="position" class="h-16 p-4 flex justify-center items-center">
            <div class="text-gray-300">CYQ NavieUI Admin</div>
        </n-layout-footer>
    </div>
</template>

<script setup lang="ts">
defineProps({
    position: {
        type: String,
        default: ''
    }
})
</script>

<style scoped>

</style>