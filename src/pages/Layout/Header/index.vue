<template>
    <n-layout-header position="absolute" class="h-16 p-4 flex justify-between items-center" bordered>
        <div>
            <n-icon size="24" @click="toggleSideMenu" class="cursor-pointer">
                <GridOutline v-if="appStore.sideCollapsed" />
                <Grid v-else />
            </n-icon>
        </div>
        <div>
            <n-dropdown :options="options" @select="selectDropdown">
                <n-button quaternary>
                    <template #icon>
                        <n-icon>
                            <PersonCircleOutline />
                        </n-icon>
                    </template>
                    {{ userStore?.userName }}
                </n-button>
            </n-dropdown>
        </div>
    </n-layout-header>
</template>

<script setup lang="ts">
import { useAppStore, useUserStore } from '@/store'
import {
Grid, GridOutline, LogOutOutline, PersonCircleOutline
} from '@vicons/ionicons5'
import type { DropdownOption } from 'naive-ui'
import { NIcon } from 'naive-ui'
import type { Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const userStore = useUserStore()

const renderIcon = (icon: Component) => {
    return () => {
        return h(NIcon, null, {
            default: () => h(icon)
        })
    }
}

const options = [
    {
        label: '退出登录',
        key: 'logout',
        icon: renderIcon(LogOutOutline),
        fn: () => logout()
    }
]

type FnType = {
    fn: () => void
}
type OptionsType = FnType & DropdownOption

// 点击下拉框
const selectDropdown = (key: string | number, option: OptionsType) => {
    option.fn()
}

const logout = () => {
    router.push(`login?redirect=${route.fullPath}`)
    appStore.logout()
}

// 侧边菜单展开收缩
const toggleSideMenu = () => {
    appStore.toggleCollapsed()
}
</script>

<style scoped>

</style>