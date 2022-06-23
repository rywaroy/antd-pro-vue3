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
import useUserStore from '@/stores/user';
import BaseMenuItem from './BaseMenuItem.vue';
import routes from '@/router/routes';

const router = useRouter();
const route = useRoute();

const selectedKeys = ref([route.path]);

const user = useUserStore();

const { permission } = user;

const filterRoute = (routeList) => {
    for (let i = routeList.length - 1; i >= 0; i--) {
        if (routeList[i].hideInMenu
        || (permission && routeList[i].meta && routeList[i].meta.permissions && !routeList[i].meta.permissions.includes(permission))
        ) {
            routeList.splice(i, 1);
        } else if (routeList[i].children) {
            filterRoute(routeList[i].children);
        }
    }
};

filterRoute(routes[0].children);

const menu = routes[0].children;

const selectMenu = (item) => {
    router.push(item.key);
};

// hideInMenu

watch(() => route.path, () => {
    selectedKeys.value = [route.path];
});
</script>
