import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // commonjs() as any,
    // 入口文件是ts类型，所以下面必须加上.ts$，否则在main.ts无法使用require
    // requireTransform({
    //   fileRegex: /.js$|.vue$|.png$|.ts$|.jpg$/
    // }), //配置require
    uni()
  ],
});
