import { BasicLayout, RouteView } from '@/layouts';

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
                },
            },
            {
                path: '/table-list',
                name: 'tableList',
                component: () => import('@/views/TableList/index.vue'),
                meta: {
                    title: '表格列表',
                },
            },
            {
                path: '',
                name: '二级目录',
                component: RouteView,
                meta: {
                    title: '二级目录',
                },
                children: [
                    {
                        path: '/b',
                        name: 'B',
                        component: () => import('@/views/B/index.vue'),
                        // hideInMenu: true,
                        meta: {
                            title: 'B',
                        },
                    },
                    {
                        path: '/c',
                        name: 'C',
                        component: () => import('@/views/C/index.vue'),
                        meta: {
                            title: 'C',
                        },
                    },
                ],
            },
        ],
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/exception/404.vue'),
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
];
