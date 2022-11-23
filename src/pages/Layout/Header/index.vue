<template>
    <n-layout-header position="absolute" class="h-16 px-4  flex justify-between items-center" bordered>
        <div>
            <n-button quaternary>
                <template #icon>
                    <n-icon size="24" @click="toggleSideMenu"
                        class="h-full cursor-pointer flex justify-center items-center">
                        <ChevronForwardCircleOutline v-if="appStore.sideCollapsed" />
                        <ChevronBackCircleOutline v-else />
                    </n-icon>
                </template>
            </n-button>
        </div>
        <div>
            <n-space>
                <n-button quaternary>
                    <template #icon>
                        <n-icon size="24" @click="toggleTheme"
                            class="h-full cursor-pointer flex justify-center items-center">
                            <SunnyOutline v-if="themeStore.theme" />
                            <Sunny v-else />
                        </n-icon>
                    </template>
                </n-button>
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
            </n-space>
        </div>
    </n-layout-header>
</template>

<script setup lang="ts">
import { useAppStore, useThemeStore, useUserStore } from '@/store'
import { ChevronBackCircleOutline, ChevronForwardCircleOutline, LogOutOutline, PersonCircleOutline, Sunny, SunnyOutline } from '@vicons/ionicons5'
import type { DropdownOption } from 'naive-ui'
import { NIcon } from 'naive-ui'
import type { Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const userStore = useUserStore()
const themeStore = useThemeStore()

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
    // console.log(route.fullPath);
    router.push({ path: `/login` })
    appStore.logout()
}

// 侧边菜单展开收缩
const toggleSideMenu = () => {
    appStore.toggleCollapsed()
}

const toggleTheme = () => {
    themeStore.setTheme()
}
</script>

<style scoped>

</style>