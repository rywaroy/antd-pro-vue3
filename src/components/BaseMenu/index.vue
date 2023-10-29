<template>
    <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        @click="selectMenu"
    >
        <base-menu-item
            v-for="(item, index) in menuData"
            :key="index"
            :menu="item"
        />
    </a-menu>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { cloneDeep } from 'lodash-es';
import useUserStore from '@/stores/user';
import BaseMenuItem from './BaseMenuItem.vue';
// import routes from '@/router/routes';
import { menu } from '@/router/routes';

defineOptions({
    name: 'BaseMenu',
});

const router = useRouter();
const route = useRoute();

const selectedKeys = ref([route.path]);
const openKeys = ref([]);

const user = useUserStore();

const { permissions } = user;

const filterRoute = (routeList) => {
    for (let i = routeList.length - 1; i >= 0; i--) {
        const isHide = routeList[i].hideInMenu;
        let hasPermission = true;
        if (permissions && routeList[i].meta && routeList[i].meta.permissions) {
            hasPermission = routeList[i].meta.permissions.some((permission) => permissions.includes(permission));
        }
        if (isHide || !hasPermission) {
            routeList.splice(i, 1);
        } else if (routeList[i].children) {
            if (route.path.startsWith(routeList[i].path)) {
                openKeys.value.push(routeList[i].path);
            }
            filterRoute(routeList[i].children);
        }
    }
};
const newRoutes = cloneDeep(menu);

filterRoute(newRoutes);

// const menu = newRoutes;
const menuData = ref(newRoutes);

const selectMenu = (item) => {
    router.push(item.key);
};

watch(() => route.path, () => {
    const active = route.meta.activeMenu ? route.meta.activeMenu : route.path;
    selectedKeys.value = [active];
});
</script>
