import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import {VantResolver} from "unplugin-vue-components/resolvers";
export default {
    plugins: [
        vue(),
        Components({
            resolvers: [VantResolver()],
        }),
    ],
    base: '/',
    build: {
        outDir:'dist',
        assetsDir:'static/assets/xx'
    },
    server: {
        proxy: {
            '/mr': {
                target: 'http://127.0.0.1:5000', //目标url
                changeOrigin: true, //支持跨域
                rewrite: (path) => path.replace(/^\/mr/, ""),
                //重写路径,替换/api
            }
        }
    }

};
