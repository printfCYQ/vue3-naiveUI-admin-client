
import type { GlobalTheme, GlobalThemeOverrides } from 'naive-ui';
import { darkTheme } from 'naive-ui';

import { defineStore } from 'pinia';
interface ThemeState {
    themeOverrides: GlobalThemeOverrides,
    theme: GlobalTheme | null
}
export const useThemeStore = defineStore({
    id: 'theme',
    persist: true, // 开启本地持久化
    state: (): ThemeState => ({
        themeOverrides: {},
        theme: null
    }),
    actions: {
        setThemeOverrides(theme: GlobalThemeOverrides) {
            this.themeOverrides = theme
        },
        setTheme() {
            this.theme = this.theme === null ? darkTheme : null
        }
    }
})