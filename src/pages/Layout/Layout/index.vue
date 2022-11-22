<template>
    <div class="h-screen" position="relative">
        <n-layout has-sider position="absolute">
            <n-layout-sider class="h-screen" bordered :collapsed="appStore.sideCollapsed" collapse-mode="width"
                :collapsed-width="64" :width="240" :native-scrollbar="false" :inverted="inverted">
                <img src="@/assets/code.svg" alt="">
                <n-menu :inverted="inverted" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
            </n-layout-sider>
            <n-layout content-style="padding: 24px;">
                <LayoutHeader></LayoutHeader>
                <n-layout-content position="absolute" style="top:4rem">
                    <div class="p-8">
                        <n-card>
                            <router-view></router-view>
                        </n-card>
                    </div>
                    <LayoutFooter></LayoutFooter>
                </n-layout-content>
            </n-layout>
        </n-layout>
    </div>
</template>
  
<script lang="ts" setup>
import LayoutFooter from '@/pages/Layout/Footer/index.vue'
import LayoutHeader from '@/pages/Layout/Header/index.vue'
import { useAppStore } from '@/store'
import {
BookOutline as BookIcon,
PersonOutline as PersonIcon,
WineOutline as WineIcon
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import type { Component } from 'vue'
const appStore = useAppStore()
function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
    {
        label: '且听风吟',
        key: 'hear-the-wind-sing',
        icon: renderIcon(BookIcon)
    },
    {
        label: '1973年的弹珠玩具',
        key: 'pinball-1973',
        icon: renderIcon(BookIcon),
        disabled: true,
        children: [
            {
                label: '鼠',
                key: 'rat'
            }
        ]
    },
    {
        label: '寻羊冒险记',
        key: 'a-wild-sheep-chase',
        disabled: true,
        icon: renderIcon(BookIcon)
    },
    {
        label: '舞，舞，舞',
        key: 'dance-dance-dance',
        icon: renderIcon(BookIcon),
        children: [
            {
                type: 'group',
                label: '人物',
                key: 'people',
                children: [
                    {
                        label: '叙事者',
                        key: 'narrator',
                        icon: renderIcon(PersonIcon)
                    },
                    {
                        label: '羊男',
                        key: 'sheep-man',
                        icon: renderIcon(PersonIcon)
                    }
                ]
            },
            {
                label: '饮品',
                key: 'beverage',
                icon: renderIcon(WineIcon),
                children: [
                    {
                        label: '威士忌',
                        key: 'whisky'
                    }
                ]
            },
            {
                label: '食物',
                key: 'food',
                children: [
                    {
                        label: '三明治',
                        key: 'sandwich'
                    }
                ]
            },
            {
                label: '过去增多，未来减少',
                key: 'the-past-increases-the-future-recedes'
            }
        ]
    }
]
const inverted = ref<boolean>(false)
</script>