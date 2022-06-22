import { BasicLayout } from '@/layouts';

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
            },
        ],
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404.vue'),
    },
];
