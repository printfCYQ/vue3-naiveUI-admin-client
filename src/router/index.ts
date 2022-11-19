import DashboardPage from '@/pages/Dashboard/index.vue';
import LoginPage from '@/pages/Login/index.vue';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    { path: '/', name: 'Dashboard', component: DashboardPage },
    { path: '/login', name: 'Loging', component: LoginPage },
]

const router = createRouter({
    history: createWebHashHistory(), // 路由模式
    strict: true, //严格模式
    routes,
    scrollBehavior: () => ({ left: 0, top: 0 }) // 跳页后，页面回正
})

export default router