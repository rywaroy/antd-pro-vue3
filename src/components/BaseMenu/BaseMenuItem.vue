<template>
    <a-sub-menu
        v-if="menu.children"
        :key="menu.name"
    >
        <template #title>
            {{ menu.name }}
        </template>
        <base-menu-item
            v-for="(item, index) in menu.children"
            :key="index"
            :menu="item"
        />
    </a-sub-menu>
    <a-menu-item
        v-else
        :key="menu.path"
    >
        {{ menu.name }}
    </a-menu-item>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BaseMenuItem',
});
</script>
<script setup>
const { menu } = defineProps({
    menu: Object,
});

</script>
