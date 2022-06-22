<template>
    <a-layout class="basic-layout">
        <a-layout-header class="basic-layout-header">
            <div class="basic-layout-header-title">
                {{ setting.title }}
            </div>
        </a-layout-header>
        <a-layout>
            <a-layout-sider theme="light">
                Sider
            </a-layout-sider>
            <a-layout-content><router-view /></a-layout-content>
            <a-layout-footer>Footer</a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script setup>
import setting from '@/config/defaultSettings';
</script>
<style scoped>
.basic-layout {
    height: 100vh;
}

.basic-layout-header {
    height: 48px;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.basic-layout-header-title {
    font-weight: 600;
    font-size: 18px;
    line-height: 48px;
    color: #fff;
}
</style>
