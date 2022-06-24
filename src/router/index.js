import { createRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress';
import routes from './routes';
import useUserStore from '@/stores/user';
import { getUserInfoApi } from '@/services/mock';
import '@/assets/styles/nprogress.css';

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

const whiteList = ['login', '404'];

router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const user = useUserStore();

    if (!whiteList.includes(to.name)) {
        // 获取用户信息，第一次进入没有信息发起请求，并设置到 store 中
        const { name, permission } = user;
        if (!name) {
            const { data } = await getUserInfoApi();
            user.setUserInfo(data);
        }

        // 验证路由是否有权限访问，没有权限访问则跳转到 404 页面
        const { permissions } = to.meta;
        if (permission && permissions && !permissions.includes(permission)) {
            next({ name: '404' });
            return;
        }
    }
    next();
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
