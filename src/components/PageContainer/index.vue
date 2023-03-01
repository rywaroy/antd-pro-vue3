<template>
    <div class="page-container">
        <div class="page-container-header">
            <a-breadcrumb v-if="stack.length > 1" class="page-container-breadcrumb">
                <a-breadcrumb-item v-for="(item, index) in stack" :key="index">
                    <span>{{ item.meta ? item.meta.title : item.name }}</span>
                </a-breadcrumb-item>
            </a-breadcrumb>
            <div class="page-container-header-heading">{{ route.meta ? route.meta.title : route.name }}</div>
        </div>
        <div class="page-container-content">
            <slot />
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PageContainer',
});
</script>
<script setup>
import { useRoute } from 'vue-router';
import { menu } from '@/router/routes';

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
<style scoped lang="less" src="./index.less"></style>
