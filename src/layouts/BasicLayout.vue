<template>
    <a-layout class="h-screen overflow-hidden">
        <a-layout-header class="h-12! px-4! flex justify-between items-center">
            <div class="font-bold text-lg leading-[48px] text-white">
                {{ setting.title }}
            </div>
            <right-content />
        </a-layout-header>
        <a-layout>
            <a-layout-sider theme="light" class="basic-sider" :collapsed="collapsed" :collapsed-width="48">
                <div class="basic-menu scroll-bar">
                    <base-menu />
                </div>
                <div class="basic-menu-fold">
                    <div @click="collapsed = !collapsed">
                        <menu-unfold-outlined v-if="collapsed" />
                        <menu-fold-outlined v-else />
                    </div>
                </div>
            </a-layout-sider>
            <a-layout-content class="flex flex-col">
                <base-page-tab />
                <router-view v-slot="{ Component, route }">
                    <keep-alive :include="include">
                        <component :is="Component" v-if="isRouteActive" :key="route.fullPath" />
                    </keep-alive>
                </router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script setup>
import { computed, ref, nextTick, provide } from 'vue';
import { storeToRefs } from 'pinia';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import setting from '@/config/defaultSettings';
import BaseMenu from '@/components/BaseMenu/index.vue';
import RightContent from '@/components/RightContent/index.vue';
import BaseFooter from '@/components/BaseFooter/index.vue';
import BasePageTab from '@/components/BasePageTab/index.vue';
import usePageTabStore from '@/stores/pageTab';

defineOptions({
    name: 'BasicLayout',
});

const pageTab = usePageTabStore();
const { tabs, active } = storeToRefs(pageTab);

const include = computed(() => tabs.value.filter((tab) => tab.meta.keepAlive).map((tab) => tab.name));

const collapsed = ref(false);

const isRouteActive = ref(true);

const reload = () => {
    isRouteActive.value = false;
    const activeTab = tabs.value.find((tab) => tab.key === active.value);
    let keepAlive = false;
    if (activeTab.meta.keepAlive) {
        activeTab.meta.keepAlive = false;
        keepAlive = true;
    }
    nextTick(() => {
        isRouteActive.value = true;
        if (keepAlive) {
            activeTab.meta.keepAlive = true;
        }
    });
};

provide('reload', reload);

</script>
<style scoped lang="less">

.basic-sider {
    :deep(.ant-layout-sider-children) {
        display: flex;
        flex-direction: column;
    }
}

.basic-menu {
    flex: 1;
}

.basic-menu-fold {
    height: 48px;
    line-height: 48px;
    color: rgba(0, 0, 0, .85);
    font-size: 16px;
    padding-left: 16px;
    border-top: 1px solid rgba(0, 0, 0, .06);

    :deep(.anticon) {
        cursor: pointer;

        &:hover {
            color: #1890ff;
        }
    }
}
</style>
