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
            <a-tab-pane v-for="(tab, index) in tabs" :key="tab.name" :closable="tab.name !== 'Home'">
                <template #tab>
                    <a-dropdown :trigger="['contextmenu']">
                        <span class="title">
                            {{ tab.meta.title }}
                            <reload-outlined v-if="tab.name === active" class="reload" :class="{ loading: reloadLoading }" @click="handleReload" />
                        </span>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item @click="closeOtherTabs(index)">关闭其他</a-menu-item>
                                <a-menu-item :disabled="index === tabs.length - 1" @click="closeRightTabs(index)">关闭到右侧</a-menu-item>
                                <a-menu-item :disabled="tab.name !== active" @click="handleReload">刷新当前页</a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </template>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>
import { defineComponent, inject, ref } from 'vue';

export default defineComponent({
    name: 'BasePageTab',
});
</script>
<script setup>
import { ReloadOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import usePageTabStore from '@/stores/pageTab';

const router = useRouter();
const pageTab = usePageTabStore();
const { tabs, active } = storeToRefs(pageTab);
const reloadLoading = ref(false);

const changeTab = (activeKey) => {
    router.push({ name: activeKey });
};

const editTab = (targetKey, action) => {
    if (action === 'remove') {
        for (let i = 0; i < tabs.value.length; i++) {
            if (tabs.value[i].name === targetKey) {
                if (active.value === targetKey) {
                    const lastTab = tabs.value[i - 1];
                    if (lastTab) {
                        router.push({ name: lastTab.name });
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
        index = tabs.value.findIndex((tab) => tab.name === active.value);
    }
    const target = tabs.value[index];
    if (index === 0) {
        pageTab.setTabs([]);
    } else {
        pageTab.setTabs([target]);
    }
    if (target.name !== active.value) {
        pageTab.setActive(target.name);
        router.push({ name: target.name });
    }
};

const closeRightTabs = (index) => {
    const target = tabs.value[index];
    pageTab.setTabs(tabs.value.slice(0, index + 1));
    if (target.name !== active.value) {
        pageTab.setActive(target.name);
        router.push({ name: target.name });
    }
};

</script>
<style lang="less" scoped src="./index.less"></style>
