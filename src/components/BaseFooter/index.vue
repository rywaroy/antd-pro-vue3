<template>
    <div class="base-footer">
        <div class="base-footer-links">
            <a href="/">Antd Pro Vue3</a>
            <a href="https://github.com/rywaroy/antd-pro-vue3" target="_blank"><github-outlined /></a>
            <a href="https://antdv.com/components/overview" target="_blank">Ant Design Vue</a>
        </div>
    </div>
</template>
<script setup>
import { GithubOutlined } from '@ant-design/icons-vue';

defineOptions({
    name: 'BaseFooter',
});
</script>
<style scoped lang="less">
.base-footer-links {
    display: flex;
    align-items: center;
    justify-content: center;

    a {
        color: rgba(0,0,0,.45);
        transition: all .3s;
        margin-right: 40px;

        &:hover {
            color: rgba(0,0,0,.85);
        }

        &:last-child {
            margin-right: 0;
        }
    }
}
</style>
