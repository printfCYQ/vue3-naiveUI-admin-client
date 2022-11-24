import { permissionDirective } from '@/directives/permission';
import router from '@/router';
import '@/styles/index.scss';
import "nprogress/nprogress.css"; // 进度条组件
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'; // pinia持久化插件
import { createApp } from "vue";
import App from "./App.vue";

// 防止tailwind.css样式冲突
// https://www.naiveui.com/zh-CN/light/docs/style-conflict
const meta = document.createElement('meta');
meta.name = 'naive-ui-style';
document.head.appendChild(meta);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(router)
app.use(pinia)
app.directive('permission', permissionDirective)

app.mount("#app");