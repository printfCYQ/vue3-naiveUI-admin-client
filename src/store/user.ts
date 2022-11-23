
import userApi from '@/api/user';
import { defineStore } from 'pinia';
import { usePermissionStore } from './permission';

interface UserState {
    userName: string,
    email: string,
    avatar: string | null,
    role?: Array<string>,
    createdAt?: string,
    updatedAt?: string,
    permissions: Array<string>
}

export const useUserStore = defineStore({
    id: 'user',
    persist: true, // 开启本地持久化
    state: (): UserState => ({
        userName: '',
        email: '',
        avatar: '',
        role: [],
        createdAt: '',
        updatedAt: '',
        permissions: []
    }),
    actions: {
        async getCurrentUserInfo() {
            try {
                const res = await userApi.me()
                if (res.code === 200) {
                    this.userName = res.data.userName
                    this.email = res.data.email
                    this.avatar = res.data.avatar
                    this.role = res.data.role
                    this.createdAt = res.data.createdAt
                    this.updatedAt = res.data.updatedAt
                    this.permissions = res.data.permissions
                }
                usePermissionStore().generateRoutes(this.permissions, true)
            } catch (error) {
                return Promise.reject(error)
            }
        }
    }
})