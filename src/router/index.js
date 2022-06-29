import { createRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress';
import routes from './routes';
import useUserStore from '@/stores/user';
import setting from '@/config/defaultSettings';
import { getUserInfoApi } from '@/services/mock';
import '@/assets/styles/nprogress.css';

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

const setDocumentTitle = (to) => {
    if (to.meta && to.meta.title) {
        window.document.title = `${to.meta.title} - ${setting.title}`;
    } else {
        window.document.title = setting.title;
    }
};

const whiteList = [];

const filterWhiteList = (routeList) => {
    for (let i = 0; i < routeList.length; i++) {
        if (routeList[i].name) {
            whiteList.push(routeList[i].name);
        }
        if (routeList[i].children) {
            filterWhiteList(routeList[i].children);
        }
    }
};

filterWhiteList(routes.slice(1));

router.beforeEach(async (to, from, next) => {
    NProgress.start();
    setDocumentTitle(to);
    const user = useUserStore();

    if (!whiteList.includes(to.name)) {
        // 获取用户信息，第一次进入没有信息发起请求，并设置到 store 中
        const { name, permission } = user;
        if (!name) {
            try {
                const { data } = await getUserInfoApi();
                user.setUserInfo(data);
            } catch {
                next({ name: 'login', query: { redirect: to.fullPath } });
                return;
            }
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
