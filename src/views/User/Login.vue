<template>
    <div class="login">
        <a-form>
            <a-form-item v-bind="validateInfos.username">
                <a-input
                    v-model:value="formState.username" size="large" type="text" placeholder="账号：admin"
                    allow-clear>
                    <template #prefix>
                        <user-outlined />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item v-bind="validateInfos.password">
                <a-input-password v-model:value="formState.password" size="large" placeholder="密码：admin" @keydown.enter="login">
                    <template #prefix>
                        <lock-outlined />
                    </template>
                </a-input-password>
            </a-form-item>
            <a-form-item>
                <a-checkbox v-model:checked="remember" style="float: left">记住密码</a-checkbox>
                <a class="forge-password" style="float: right;">忘记密码</a>
            </a-form-item>
            <a-form-item style="margin-top:24px">
                <a-button
                    size="large"
                    block
                    type="primary"
                    class="login-button"
                    :loading="loading"
                    @click="login">
                    登录
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { Form } from 'ant-design-vue';
import { loginApi } from '@/services/mock';

const router = useRouter();
const route = useRoute();

const loading = ref(false);
const remember = ref(false);

const formState = reactive({
    username: '',
    password: '',
});

const rules = reactive({
    username: [{ required: true, message: '请输入账号' }],
    password: [{ required: true, message: '请输入密码' }],
});

const { validate, validateInfos } = Form.useForm(formState, rules);

if (window.localStorage.getItem('remember')) {
    remember.value = true;
    formState.username = window.localStorage.getItem('username');
    formState.password = window.localStorage.getItem('password');
}

const login = () => {
    if (loading.value) {
        return;
    }

    validate().then((values) => {
        loading.value = true;
        loginApi(values).then(() => {
            loading.value = false;
            if (remember.value) {
                window.localStorage.setItem('remember', true);
                window.localStorage.setItem('username', values.username);
                window.localStorage.setItem('password', values.password);
            } else {
                window.localStorage.removeItem('remember');
                window.localStorage.removeItem('username');
                window.localStorage.removeItem('password');
            }
            if (route.query.redirect) {
                router.push(route.query.redirect);
            } else {
                router.push('/');
            }
        }).catch(() => {
            loading.value = false;
        });
    });
};
</script>
<style lang="less" scoped>
.login {
    min-width: 260px;
    width: 368px;
    margin: 0 auto;
}
</style>
