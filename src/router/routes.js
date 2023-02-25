import { BasicLayout, UserLayout } from '@/layouts';

const homeRoute = {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/index.vue'),
    meta: {
        permissions: ['admin'],
        title: '首页',
        icon: 'home',
        keepAlive: true,
    },
};

const routes = [
    homeRoute,
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/index.vue'),
        meta: {
            permissions: ['admin'],
            title: '首页',
            icon: 'home',
            keepAlive: true,
        },
    },
    {
        path: '/list/table-list',
        name: 'TableList',
        component: () => import('@/views/TableList/index.vue'),
        meta: {
            title: '表格列表',
            keepAlive: true,
        },
    },
    {
        path: '/list/store-list',
        name: 'StoreList',
        component: () => import('@/views/StoreList/index.vue'),
        meta: {
            title: '数据持久化列表',
            keepAlive: true,
        },
    },
    {
        path: '/form/basic-form',
        name: 'basicForm',
        component: () => import('@/views/BasicForm/index.vue'),
        // hideInMenu: true,
        meta: {
            title: '基础表单',
        },
    },
];

const baseRoutes = [
    {
        path: '/',
        component: BasicLayout,
        redirect: { name: 'home' },
        children: routes,
    },
    {
        path: '/user',
        component: UserLayout,
        redirect: { name: 'login' },
        children: [
            {
                path: '/user/login',
                name: 'login',
                component: () => import('@/views/User/Login.vue'),
                meta: {
                    title: '登录',
                },
            },
            {
                path: '/user/change-password',
                name: 'changePassword',
                component: () => import('@/views/User/ChangePassword.vue'),
                meta: {
                    title: '修改密码',
                },
            },
        ],
    },
    {
        path: '/403',
        name: '403',
        component: () => import('@/views/exception/403.vue'),
    },
    {
        path: '/500',
        name: '500',
        component: () => import('@/views/exception/500.vue'),
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/exception/404.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
    },
];

const menu = [
    {
        name: 'Home',
    },
    {
        path: '/list',
        meta: {
            title: '列表页',
            icon: 'table',
        },
        children: [
            {
                name: 'TableList',
            },
            {
                name: 'StoreList',
            },
        ],
    },
    {
        path: '/form',
        meta: {
            title: '表单页',
            icon: 'form',
        },
        children: [
            {
                name: 'basicForm',
            },
        ],
    },
];

const routeMap = {};
routes.forEach((route) => {
    routeMap[route.name] = route;
});

function setMenus(menus) {
    menus.forEach((child) => {
        if (child.children) {
            setMenus(child.children);
        } else {
            const route = routeMap[child.name];
            if (route) {
                Object.keys(route).forEach((key) => {
                    if (key !== 'component') {
                        child[key] = route[key];
                    }
                });
            }
        }
    });
}

setMenus(menu);

export { menu, homeRoute };

export default baseRoutes;
