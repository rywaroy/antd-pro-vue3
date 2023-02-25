<template>
    <page-container>
        <div class="welcome">
            Home
        </div>
    </page-container>
</template>
<script>
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
    name: 'Home',
});
</script>
<script setup>

onMounted(() => {
    console.log('mounted');
});
</script>
