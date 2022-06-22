import { BasicLayout, RouteView } from '@/layouts';

export default [
    {
        path: '/',
        component: BasicLayout,
        redirect: '/welcome',
        children: [
            {
                path: '/welcome',
                name: 'welcome',
                component: () => import('@/views/index.vue'),
                meta: {
                    permissions: ['admin'],
                },
                menu: {
                    hideInMenu: true,
                },
            },
            {
                path: '/A',
                name: 'A',
                component: () => import('@/views/A/index.vue'),
            },
            {
                path: '',
                name: '二级目录',
                component: RouteView,
                children: [
                    {
                        path: '/B',
                        name: 'B',
                        component: () => import('@/views/B/index.vue'),
                    },
                    {
                        path: '/C',
                        name: 'C',
                        component: () => import('@/views/C/index.vue'),
                    },
                ],
            },
        ],
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404.vue'),
    },
];
