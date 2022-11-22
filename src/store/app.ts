import userApi from '@/api/user';
import type { ILoginParams } from '@/api/user/types';
import { defineStore } from 'pinia';
import { useUserStore } from './user';
interface AppState {
    token: string,
    sideCollapsed: boolean
}

export const useAppStore = defineStore({
    id: 'app',
    persist: true, // 开启本地持久化
    state: (): AppState => ({
        token: '', // 用户token
        sideCollapsed: false // 侧边菜单展开收缩
    }),
    actions: {
        // 登陆
        async login(loginForm: ILoginParams) {
            try {
                const res = await userApi.login(loginForm)
                this.token = res.data.token
            } catch (error) {
                return Promise.reject(error)
            }
        },

        async logout() {
            const userStore = useUserStore()
            this.token = ''
            userStore.$reset() // 还原清空store
        },

        // 侧边菜单展开收缩
        toggleCollapsed() {
            this.sideCollapsed = !this.sideCollapsed
        }
    }
})