import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { svgBuilder } from './src/plugins/svgBuilder';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/antd-pro-vue3/dist/',
    server: {
        port: 3000,
    },
    plugins: [
        vue(),
        svgBuilder('./src/assets/svg/'),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
});
