<template>
    <div>
        <n-layout-footer bordered :position="position" class="h-16 p-4">
            城府路
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