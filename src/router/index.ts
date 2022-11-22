import LayoutPage from '@/pages/Layout/Layout/index.vue';
import LoginPage from '@/pages/Login/index.vue';
import { useAppStore } from "@/store";
import type { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from "vue-router";
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'root',
        component: LayoutPage,
        redirect: 'dashboard',
        children: [
            { path: 'dashboard', name: 'Dashboard', component: () => import('@/pages/Dashboard/index.vue') },
        ]
    },
    { path: '/login', name: 'Loging', component: LoginPage },
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