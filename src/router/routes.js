import { BasicLayout, RouteView, UserLayout } from '@/layouts';

export default [
    {
        path: '/',
        component: BasicLayout,
        redirect: { name: 'welcome' },
        children: [
            {
                path: '/welcome',
                name: 'welcome',
                component: () => import('@/views/index.vue'),
                meta: {
                    permissions: ['admin'],
                    title: '首页',
                    icon: 'home',
                },
            },
            {
                path: '/list',
                name: 'list',
                component: RouteView,
                meta: {
                    title: '列表页',
                    icon: 'table',
                },
                children: [
                    {
                        path: '/list/table-list',
                        name: 'tableList',
                        component: () => import('@/views/TableList/index.vue'),
                        meta: {
                            title: '表格列表',
                        },
                    },
                    {
                        path: '/list/store-list',
                        name: 'storeList',
                        component: () => import('@/views/StoreList/index.vue'),
                        meta: {
                            title: '数据持久化列表',
                        },
                    },
                ],
            },
            {
                path: '/form',
                name: 'form',
                component: RouteView,
                meta: {
                    title: '表单页',
                    icon: 'form',
                },
                children: [
                    {
                        path: '/form/basic-form',
                        name: 'basicForm',
                        component: () => import('@/views/BasicForm/index.vue'),
                        // hideInMenu: true,
                        meta: {
                            title: '基础表单',
                        },
                    },
                ],
            },
        ],
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
