<template>
    <div class="h-screen" position="relative">
        <n-layout has-sider position="absolute">
            <n-layout-sider class="h-screen" bordered :collapsed="appStore.sideCollapsed" collapse-mode="width"
                :collapsed-width="64" :width="240" :native-scrollbar="false" :inverted="inverted">
                <LayoutLogo></LayoutLogo>
                <n-menu :inverted="inverted" :collapsed-width="64" :options="menuOptions" :value="$route.path"
                    @update:value="updateMenu" />
            </n-layout-sider>
            <n-layout content-style="padding: 24px;">
                <LayoutHeader></LayoutHeader>
                <n-layout-content style="top:4rem" position="absolute">
                    <div class="p-8" style="min-height: calc(100vh - 8rem);">
                        <n-card>
                            <LayoutContent></LayoutContent>
                        </n-card>
                    </div>
                    <LayoutFooter :position="''"></LayoutFooter>
                </n-layout-content>
            </n-layout>
        </n-layout>
    </div>
</template>
  
<script lang="ts" setup>
import LayoutContent from '@/pages/Layout/Content/index.vue'
import LayoutFooter from '@/pages/Layout/Footer/index.vue'
import LayoutHeader from '@/pages/Layout/Header/index.vue'
import LayoutLogo from '@/pages/Layout/Logo/index.vue'
import { useAppStore, usePermissionStore } from '@/store'
import { NIcon, type MenuOption } from 'naive-ui'
import type { Component } from 'vue'
import { RouterLink, useRouter, type RouteRecordRaw } from 'vue-router'
const appStore = useAppStore()
const permissionStore = usePermissionStore()
const router = useRouter()

const asyncRenderIcon = async (icon: string) => {
    //@ts-ignore
    const { [icon]: iconComp } = await import("@vicons/ionicons5");
    return () => h(NIcon, null, { default: () => h(iconComp) });
}
const getOption = async (menu: any): Promise<routerType> => ({
    // label: () =>
    //     h(
    //         RouterLink,
    //         {
    //             to: menu.path,
    //         },
    //         { default: () => menu.meta.title }
    //     ),
    label: menu.meta.title,
    key: menu.path,
    icon: await asyncRenderIcon(menu.meta.icon),
});

type routerType = {
    label: Component,
    key: string,
    icon?: Component,
    children?: Array<any>
}
const menuOptions = ref<Array<routerType>>([]);
onMounted(async () => {
    const data = permissionStore.menuRouters as RouteRecordRaw[];
    menuOptions.value = await Promise.all(
        data.map(async (m) => {
            if (m.children && m.children.length > 0) {
                const children = await Promise.all(
                    m.children.map(async (child) => await getOption(child))
                );
                const menu = await getOption(m);
                menu.children = children;
                return menu;
            } else {
                return await getOption(m);
            }
        })
    );
});

const inverted = ref<boolean>(false)

const updateMenu = (key: string, item: MenuOption) => {
    appStore.setActiveMenu(key)
    router.push(key)
}
</script>