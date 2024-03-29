<template>
    <div class="base-page-tab-wrap">
        <a-tabs
            v-model:activeKey="active"
            hide-add
            type="editable-card"
            class="base-page-tab"
            @change="changeTab"
            @edit="editTab">
            <template #rightExtra>
                <a-dropdown>
                    <div class="base-page-tab-extra">
                        <ellipsis-outlined />
                    </div>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item @click="closeOtherTabs()">关闭其他</a-menu-item>
                            <a-menu-item @click="handleReload">刷新当前页</a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </template>
            <a-tab-pane v-for="(tab, index) in tabs" :key="tab.key" :closable="tab.name !== homeName">
                <template #tab>
                    <a-dropdown :trigger="['contextmenu']">
                        <div class="title">
                            <div class="title-text truncate">{{ tab.meta.title }}</div>
                            <reload-outlined v-if="tab.key === active" class="reload" :class="{ loading: reloadLoading }" @click="handleReload" />
                        </div>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item @click="closeOtherTabs(index)">关闭其他</a-menu-item>
                                <a-menu-item :disabled="index === tabs.length - 1" @click="closeRightTabs(index)">关闭到右侧</a-menu-item>
                                <a-menu-item :disabled="tab.key !== active" @click="handleReload">刷新当前页</a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </template>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script setup>
import { inject, ref } from 'vue';
import { ReloadOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { homeName } from '@/router/routes';
import usePageTabStore from '@/stores/pageTab';

defineOptions({
    name: 'BasePageTab',
});

const router = useRouter();
const pageTab = usePageTabStore();
const { tabs, active } = storeToRefs(pageTab);
const reloadLoading = ref(false);

const changeTab = (activeKey) => {
    const to = tabs.value.find((tab) => tab.key === activeKey);
    router.push(to);
};
const editTab = (targetKey, action) => {
    if (action === 'remove') {
        for (let i = 0; i < tabs.value.length; i++) {
            if (tabs.value[i].key === targetKey) {
                if (active.value === targetKey) {
                    const lastTab = tabs.value[i - 1];
                    if (lastTab) {
                        router.push(lastTab);
                    }
                }
                pageTab.removeTab(targetKey);
                break;
            }
        }
    }
};

const reload = inject('reload');

const handleReload = () => {
    reload();
    reloadLoading.value = true;
    setTimeout(() => {
        reloadLoading.value = false;
    }, 500);
};

const closeOtherTabs = (index) => {
    if (index === undefined) {
        index = tabs.value.findIndex((tab) => tab.key === active.value);
    }
    const target = tabs.value[index];
    if (index === 0) {
        pageTab.setTabs([]);
    } else {
        pageTab.setTabs([target]);
    }
    if (target.key !== active.value) {
        router.push(target);
    }
};

const closeRightTabs = (index) => {
    const target = tabs.value[index];
    pageTab.setTabs(tabs.value.slice(0, index + 1));
    if (target.key !== active.value) {
        router.push(target);
    }
};

</script>
<style lang="less" scoped src="./index.less"></style>
