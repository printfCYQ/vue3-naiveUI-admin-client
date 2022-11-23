<template>
    <div
        class="h-16 flex justify-center items-center text-xl font-bold text-medium text-primary whitespace-nowrap overflow-hidden">
        {{ appStore.sideCollapsed ? 'CYQ' : 'CYQ NavieUI Admin' }}
    </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
const appStore = useAppStore()
</script>

<style scoped>

</style>