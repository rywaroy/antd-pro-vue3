import { createRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress';
import routes, { homeName } from './routes';
import useUserStore from '@/stores/user';
import usePageTabStore from '@/stores/pageTab';
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

const whiteList = ['login', '404'];

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
    const pageTab = usePageTabStore();
    if (!whiteList.includes(to.name)) {
        // 获取用户信息，第一次进入没有信息发起请求，并设置到 store 中
        const { name, permissions: up } = user;
        let userPermissions = up;
        if (!name) {
            try {
                const { data } = await getUserInfoApi();
                user.setUserInfo(data);
                if (data.roles) {
                    userPermissions = data.roles;
                }
            } catch {
                next({ name: 'login', query: { redirect: to.fullPath } });
                return;
            }
        }

        // 验证路由是否有权限访问，没有权限访问则跳转到 404 页面
        const { permissions } = to.meta;
        if (permissions && permissions.length) {
            const hasPermission = userPermissions.some((permission) => permissions.includes(permission));
            if (!hasPermission) {
                next({ name: '403' });
                return;
            }
        }
    }
    const key = to.name === homeName ? 1 : Math.random();
    pageTab.addTab({
        ...to,
        key,
    });
    next();
});

router.afterEach((to, from) => {
    if (window.history.state.replaced) {
        const pageTab = usePageTabStore();
        const tab = pageTab.tabs.find((item) => item.fullPath === from.fullPath);
        if (tab) {
            pageTab.removeTab(tab.key);
        }
    }
    NProgress.done();
});

export default router;
