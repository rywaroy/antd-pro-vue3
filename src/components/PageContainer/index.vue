<template>
    <div class="page-container">
        <div class="bg-white pb-3 px-6">
            <a-breadcrumb v-if="stack.length > 1" class="pb-2">
                <a-breadcrumb-item v-for="(item, index) in stack" :key="index">
                    <span>{{ item.meta ? item.meta.title : item.name }}</span>
                </a-breadcrumb-item>
            </a-breadcrumb>
            <div class="text-black/80 font-semibold text-base leading-5 truncate">{{ route.meta ? route.meta.title : route.name }}</div>
        </div>
        <div class="my-6 mx-6">
            <slot />
        </div>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { menu } from '@/router/routes';

defineOptions({
    name: 'PageContainer',
});

const route = useRoute();

const stack = [];
let flag = false;

const findRoute = (routeList, path) => {
    for (let i = 0; i < routeList.length; i++) {
        const { path: routePath, children, name, meta } = routeList[i];
        stack.push({
            path: routePath,
            name,
            meta,
        });
        if (routeList[i].path === path) {
            flag = true;
            return;
        }
        if (children) {
            findRoute(children, path);
        }
        if (flag) {
            return;
        }
        stack.pop();
    }
};

findRoute(menu, route.path);

</script>
