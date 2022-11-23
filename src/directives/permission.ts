import type { Directive, DirectiveBinding } from 'vue';
import { useUserStore, usePermissionStore } from '@/store';

// 判断用户是否有权限，true:有，false:没有
const hasPermission = (value: string) => {
    console.log(useUserStore().permissions, value);
    return useUserStore().permissions.includes(value)
}

export const permissionDirective: Directive = {
    mounted(el: Element, { value }: DirectiveBinding) {
        !hasPermission(value) && el.parentNode?.removeChild(el)
    }
}