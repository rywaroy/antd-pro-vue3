<template>
    <a-layout class="basic-layout">
        <a-layout-header class="basic-layout-header">
            <div class="basic-layout-header-title">
                {{ setting.title }}
            </div>
            <right-content />
        </a-layout-header>
        <a-layout>
            <a-layout-sider theme="light">
                <base-menu />
            </a-layout-sider>
            <a-layout>
                <a-layout-content><router-view /></a-layout-content>
                <a-layout-footer>footer</a-layout-footer>
            </a-layout>
        </a-layout>
    </a-layout>
</template>
<script setup>
import setting from '@/config/defaultSettings';
import BaseMenu from '@/components/BaseMenu/index.vue';
import RightContent from '@/components/RightContent/index.vue';

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
