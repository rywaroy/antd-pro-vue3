import { createRouter, createWebHashHistory } from 'vue-router';
import { storeToRefs } from 'pinia';
import NProgress from 'nprogress';
import { BasicLayout } from '@/layouts';
import useUserStore from '@/stores/user';
import { getUserInfoApi } from '@/services/mock';
import '@/assets/styles/nprogress.css';

const routes = [
    {
        path: '/',
        component: BasicLayout,
        children: [
            {
                path: '/welcome',
                name: 'welcome',
                component: () => import('@/views/index.vue'),
                meta: {
                    permissions: ['admin'],
                },
            },
        ],
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404.vue'),
    },
];

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
        const { name, permission } = storeToRefs(user);
        if (!name.value) {
            const { data } = await getUserInfoApi();
            user.setUserInfo(data);
        }

        // 验证路由是否有权限访问，没有权限访问则跳转到 404 页面
        const { permissions } = to.meta;
        if (permissions && !permissions.includes(permission.value)) {
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
