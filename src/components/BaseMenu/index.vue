<template>
    <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        @select="selectMenu"
    >
        <base-menu-item
            v-for="(item, index) in menuData"
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
import cloneDeep from 'lodash/cloneDeep';
import useUserStore from '@/stores/user';
import BaseMenuItem from './BaseMenuItem.vue';
// import routes from '@/router/routes';
import { menu } from '@/router/routes';

const router = useRouter();
const route = useRoute();

const selectedKeys = ref([route.path]);
const openKeys = ref([]);

const user = useUserStore();

const { permission } = user;

const filterRoute = (routeList) => {
    for (let i = routeList.length - 1; i >= 0; i--) {
        if (routeList[i].hideInMenu
        || (permission && routeList[i].meta && routeList[i].meta.permissions && !routeList[i].meta.permissions.includes(permission))
        ) {
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
    selectedKeys.value = [route.path];
});
</script>
