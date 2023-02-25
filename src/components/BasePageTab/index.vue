<template>
    <a-tabs
        v-model:activeKey="active"
        hide-add type="editable-card"
        @change="changeTab"
        @edit="editTab">
        <a-tab-pane v-for="tab in tabs" :key="tab.name" :tab="tab.meta.title" :closable="tab.name !== 'home'" />
    </a-tabs>
</template>
<script>
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
    name: 'BasePageTab',
});
</script>
<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import usePageTabStore from '@/stores/pageTab';

const router = useRouter();
const pageTab = usePageTabStore();
const { tabs, active } = storeToRefs(pageTab);

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

</script>
<style lang="less" scoped src="./index.less"></style>
