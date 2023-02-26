<template>
    <a-tabs
        v-model:activeKey="active"
        hide-add
        type="editable-card"
        class="base-page-tab"
        @change="changeTab"
        @edit="editTab">
        <a-tab-pane v-for="tab in tabs" :key="tab.name" :closable="tab.name !== 'Home'">
            <template #tab>
                <span>
                    {{ tab.meta.title }}
                    <reload-outlined v-if="tab.name === active" class="reload" :class="{ loading: reloadLoading }" @click="handleReload" />
                </span>
            </template>
        </a-tab-pane>
    </a-tabs>
</template>
<script>
import { defineComponent, inject, ref } from 'vue';

export default defineComponent({
    name: 'BasePageTab',
});
</script>
<script setup>
import { ReloadOutlined } from '@ant-design/icons-vue';
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

</script>
<style lang="less" scoped src="./index.less"></style>
