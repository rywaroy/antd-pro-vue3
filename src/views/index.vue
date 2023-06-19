<template>
    <page-container>
        <div class="welcome">
            Home
        </div>
    </page-container>
</template>
<script setup>
import { onMounted } from 'vue';

defineOptions({
    name: 'Home',
});

onMounted(() => {
    console.log('mounted');
});
</script>
