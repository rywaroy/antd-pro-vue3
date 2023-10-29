<template>
    <template v-if="menu.children && menu.children.length > 0">
        <a-sub-menu
            :key="menu.path"
        >
            <template #icon>
                <svg-icon v-if="menu.meta && menu.meta.icon" :name="menu.meta.icon" />
            </template>
            <template #title>
                {{ menu.meta ? menu.meta.title : menu.name }}
            </template>
            <base-menu-item
                v-for="(item, index) in menu.children"
                :key="index"
                :menu="item"
            />
        </a-sub-menu>
    </template>
    <template v-else>
        <a-menu-item
            :key="menu.path"
        >
            <template #icon>
                <svg-icon v-if="menu.meta && menu.meta.icon" :name="menu.meta.icon" />
            </template>
            {{ menu.meta ? menu.meta.title : menu.name }}
        </a-menu-item>
    </template>
</template>
<script setup>
defineOptions({
    name: 'BaseMenuItem',
});

const { menu } = defineProps({
    menu: Object,
});

</script>
