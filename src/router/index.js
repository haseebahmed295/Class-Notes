import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/Lectures/:Subject/:Lecture',
                    name: 'lecture',
                    component: () => import('@/views/Lecture.vue'),
                    props: true
                }
            ]
        },
        {
            path: '/user/logout',
            name: 'logout',
            component: () => import('@/views/pages/auth/LogOut.vue')
        },

        {
            path: '/user/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        }
    ]
});

export default router;
