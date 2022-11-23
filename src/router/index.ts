import { PermissionEnum } from '@/config/permission.config';
import LayoutPage from '@/pages/Layout/Layout/index.vue';
import BlankLayoutPage from '@/pages/Layout/BlankLayout/index.vue';
import LoginPage from '@/pages/Login/index.vue';
import { useAppStore } from "@/store";
import type { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from "vue-router";

// 扩展RouteMeta类型
declare module 'vue-router' {
    interface RouteMeta extends Record<string | number | symbol, unknown> {
        permission?: string;
        icon?: string;
        title?: string;
    }
}

export const MENU_ROUTE_NAME = 'menu_router_name'
export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: MENU_ROUTE_NAME,
        component: LayoutPage,
        redirect: 'dashboard',
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                meta: {
                    permission: PermissionEnum.DASHBOARD,
                    title: '控制台',
                    icon: 'StatsChart'
                },
                component: () => import('@/pages/Dashboard/index.vue')
            }, {
                path: '/user',
                name: 'User',
                redirect: { path: '/user/list' },
                meta: {
                    permission: PermissionEnum.USER,
                    title: '用户管理',
                    icon: 'AccessibilitySharp'
                },
                component: BlankLayoutPage,
                children: [
                    {
                        path: '/user/list',
                        name: 'UserList',
                        meta: {
                            permission: PermissionEnum.USER_LIST,
                            title: '用户列表',
                            icon: 'List'
                        },
                        component: () => import('@/pages/User/UserList/index.vue')
                    },
                    {
                        path: '/role/list',
                        name: 'RoleList',
                        meta: {
                            permission: PermissionEnum.USER_LIST,
                            title: '角色列表',
                            icon: 'ListCircle'
                        },
                        component: () => import('@/pages/User/RoleList/index.vue')
                    }
                ]
            }
        ]
    },
    { path: '/login', name: 'Login', component: LoginPage },
]

const router = createRouter({
    history: createWebHashHistory(), // 路由模式
    strict: true, //严格模式
    routes,
    scrollBehavior: () => ({ left: 0, top: 0 }) // 跳页后，页面回正
})

const whiteList = ['/login']; // 路由白名单

// 路由守卫
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const appStore = useAppStore();
    if (!appStore.token) {
        // 没有token，判断是否在白名单内。不在白名单，返回登陆页
        whiteList.includes(to.path) ? next() : next(`login?redirect=${to.path}`)
    } else {
        // 有token，是登陆页，不让去。
        if (to.path === '/login') {
            next({ path: '/' })
        }
    }

    next();
})

export default router