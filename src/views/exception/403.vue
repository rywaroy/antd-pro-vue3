<template>
    <a-result
        status="403"
        title="403"
        sub-title="Sorry, you don't have access to this page.">
        <template #extra>
            <a-button type="primary" @click="toHome">Back Home</a-button>
        </template>
    </a-result>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const toHome = () => {
    router.push({ path: '/' });
};
</script>
