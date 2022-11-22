import loginApi from '@/api/user';
import type { ILoginParams } from '@/api/user/types';
import type { StoreDefinition } from 'pinia';
import { defineStore } from 'pinia';
interface AppState {
    token: string
}

export const useAppStore: StoreDefinition<string, AppState> = defineStore({
    id: 'app',
    persist: true, // 开启本地持久化
    state: () => ({
        token: ''
    }),
    actions: {
        async login(loginForm: ILoginParams) {
            try {
                const res = await loginApi.login(loginForm)
                this.token = res.data.token
            } catch (error) {
                return Promise.reject(error)
            }
        }
    }
})