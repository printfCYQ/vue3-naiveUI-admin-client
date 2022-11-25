import { MENU_ROUTE_NAME, routes } from "@/router";
import { defineStore } from "pinia";
import type { RouteRecordName, RouteRecordRaw } from "vue-router";


type PermissionSate = {
    routes: Array<RouteRecordRaw>,
}
export const usePermissionStore = defineStore('permission', {
    state: (): PermissionSate => {
        return {
            routes: [], // 渲染的侧边菜单
        }
    },
    persist: true,
    actions: {
        generateRoutes(permissions: Array<string>, admin = false) {
            console.log(routes);
            this.routes = admin ? routes : filterRoutes(routes, permissions)
            console.log(this.routes);
        }
    },
    getters: {
        // 最终渲染的侧边菜单
        menuRouters(): Array<RouteRecordRaw> | undefined {
            const tempRouters = this.routes.find(route => route.name === MENU_ROUTE_NAME)?.children
            // return flatMeta(tempRouters)
            return tempRouters
        },
        permissionRoutePathList(): Array<string> {
            return this.routes ? flatRoutePath(this.routes) : []
        }
    }
})


// 配合menu组件将meta平铺
const flatMeta = (router: Array<RouteRecordRaw> | undefined) => {
    return router?.map((route: RouteRecordRaw) => {
        console.log(route);
        if (route.children) {
            route.children = flatMeta(route.children)
        }
        return route.meta ? { ...route, ...route.meta } : route
    })
}


// 根据用户权限，筛选菜单
const filterRoutes = (routes: Array<RouteRecordRaw>, permissions: Array<string>) => {
    return routes.filter((route: RouteRecordRaw) => {
        // 递归
        if (route.children) {
            route.children = filterRoutes(route.children, permissions)
        }
        // 返回
        // 1. 没有meta的路由
        // 2. meta里没有permission的路由
        // 3. permission在permissions数组里
        return (!route.meta || (route.meta && !route.meta.permission) || (route.meta && route.meta.permission && permissions.includes(route.meta.permission)))
    })
}


// 扁平化 path .用户鉴权
const flatRoutePath = (routes: Array<RouteRecordRaw>) => {
    let routePathList: Array<string> = []
    routes.map((route: RouteRecordRaw) => {
        if (route.path) {
            routePathList.push(route.path)
        }
        if (route.children) {
            routePathList.push(...flatRoutePath(route.children))
        }
    })
    return routePathList
}