<template>
    <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        @select="selectMenu"
    >
        <base-menu-item
            v-for="(item, index) in menu"
            :key="index"
            :menu="item"
        />
    </a-menu>
</template>
<script>
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
    name: 'BaseMenu',
});
</script>
<script setup>
import { useRouter, useRoute } from 'vue-router';
import BaseMenuItem from './BaseMenuItem.vue';
import routes from '@/router/routes';

const router = useRouter();
const route = useRoute();

const selectedKeys = ref([route.path]);

const menu = routes[0].children;

const selectMenu = (item) => {
    router.push(item.key);
};

watch(() => route.path, () => {
    selectedKeys.value = [route.path];
});
</script>
