import { permissionDirective } from '@/directives/permission';
import router from '@/router';
import '@/styles/index.scss';
import "nprogress/nprogress.css"; // 进度条组件
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'; // pinia持久化插件
import { createApp } from "vue";
import App from "./App.vue";
import './index.css';
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(router)
app.use(pinia)
app.directive('permission', permissionDirective)

app.mount("#app");