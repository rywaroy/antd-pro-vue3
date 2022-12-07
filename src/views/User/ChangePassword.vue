<template>
    <div class="change-password">
        <a-form>
            <a-form-item v-bind="validateInfos.username">
                <a-input
                    v-model:value="formState.username" size="large" type="text" placeholder="账号"
                    allow-clear>
                    <template #prefix>
                        <user-outlined />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item v-bind="validateInfos.oldPassword">
                <a-input-password v-model:value="formState.oldPassword" size="large" placeholder="旧密码">
                    <template #prefix>
                        <lock-outlined />
                    </template>
                </a-input-password>
            </a-form-item>
            <a-form-item v-bind="validateInfos.password">
                <a-input-password v-model:value="formState.password" size="large" placeholder="新密码">
                    <template #prefix>
                        <lock-outlined />
                    </template>
                </a-input-password>
            </a-form-item>
            <a-form-item v-bind="validateInfos.newPassword">
                <a-input-password v-model:value="formState.newPassword" size="large" placeholder="确认密码">
                    <template #prefix>
                        <lock-outlined />
                    </template>
                </a-input-password>
            </a-form-item>
            <a-form-item style="margin-top:24px">
                <a-button
                    size="large"
                    block
                    type="primary"
                    class="login-button"
                    :loading="loading"
                    @click="change">
                    修改
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Form, message } from 'ant-design-vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';

const router = useRouter();

const loading = ref(false);
const formState = reactive({
    username: '',
    oldPassword: '',
    password: '',
    newPassword: '',
});

const rules = reactive({
    username: [{ required: true, message: '请输入账号' }],
    oldPassword: [{ required: true, message: '请输入旧密码' }],
    password: [{ required: true, message: '请输入密码' }],
    newPassword: [
        { required: true, message: '请输入确认密码' },
        { validator: (rule, value) => {
            if (value !== formState.password) {
                return Promise.reject('两次输入的密码不一致');
            }
            return Promise.resolve();
        } },
    ],
});

const { validate, validateInfos } = Form.useForm(formState, rules);

const change = () => {
    if (loading.value) {
        return;
    }
    validate().then((values) => {
        loading.value = true;
        setTimeout(() => {
            loading.value = true;
            router.push({ name: 'login' });
            message.success('修改成功');
        }, 1000);
    });
};
</script>
<style lang="less" scoped>
.change-password {
    min-width: 260px;
    width: 368px;
    margin: 0 auto;
}
</style>
