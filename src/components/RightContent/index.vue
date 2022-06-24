<template>
    <div class="right-content">
        <a-dropdown>
            <template #overlay>
                <a-menu>
                    <a-menu-item>
                        <div class="right-content-dropdown-item"><logout-outlined /> 退出登录</div>
                    </a-menu-item>
                </a-menu>
            </template>
            <div class="right-content-user">
                <img class="right-content-user-avatar" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="avatar">
                {{ name }}
            </div>
        </a-dropdown>
    </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'RightContent',
});
</script>
<script setup>
import { storeToRefs } from 'pinia';
import { LogoutOutlined } from '@ant-design/icons-vue';
import useUserStore from '@/stores/user';

const user = useUserStore();

const { name } = storeToRefs(user);
</script>
<style lang="less" scoped>
.right-content-dropdown-item {
    min-width: 160px;
}

.right-content-user {
    display: flex;
    align-items: center;
    color: #fff;
    height: 100%;
    padding: 0 12px;
    cursor: pointer;
    transition: all .3s;

    &:hover {
        background-color: #252a3d;
    }
}

.right-content-user-avatar {
    width: 24px;
    height: 24px;
    margin-right: 8px;
}
</style>
