import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/dev': {
        target: 'http://localhost:7001/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/dev/, ''),
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      imports: [
        "vue",
        {
          "naive-ui": [],
        },
      ],
      dts: "src/auto-import.d.ts",
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
