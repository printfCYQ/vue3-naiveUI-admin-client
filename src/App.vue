<template>
  <transition name="fade-slide" mode="out-in" appear>
    <n-config-provider :theme-overrides="themeStore.themeOverrides" :locale="zhCN" :date-locale="dateZhCN" :theme="themeStore.theme">
      <n-el tag="div">
        <n-loading-bar-provider>
          <n-dialog-provider>
            <n-notification-provider>
              <n-message-provider>
                <router-view />
              </n-message-provider>
            </n-notification-provider>
          </n-dialog-provider>
        </n-loading-bar-provider>
      </n-el>
    </n-config-provider>
  </transition>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store';
import { dateZhCN, zhCN } from 'naive-ui';
const themeStore = useThemeStore();
</script>