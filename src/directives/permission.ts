import { useUserStore } from '@/store';
import type { Directive, DirectiveBinding } from 'vue';

// 判断用户是否有权限，true:有，false:没有
const hasPermission = (value: string) => {
    return useUserStore().permissions.includes(value)
}

export const permissionDirective: Directive = {
    mounted(el: Element, { value }: DirectiveBinding) {
        !hasPermission(value) && el.parentNode?.removeChild(el)
    }
}