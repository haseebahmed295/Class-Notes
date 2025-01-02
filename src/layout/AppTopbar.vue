<script setup>
import { useLayout } from '@/layout/composables/layout';
import { checkLoginStatus } from '@/server/Data.vue';
import Menu from 'primevue/menu';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import AppConfigurator from './AppConfigurator.vue';

const router = useRouter();

const { toggleMenu, toggleDarkMode, isDarkTheme } = useLayout();
const menu = ref();

const isLoggedIn = ref(false);

const items = ref([]);
onMounted(async () => {
    isLoggedIn.value = await checkLoginStatus();
    // console.log('isLoggedIn:', isLoggedIn.value);
    if (isLoggedIn.value) {
        items.value = [
            {
                label: 'User',
                items: [
                    {
                        label: 'Log Out',
                        icon: 'pi pi-sign-out',
                        command: () => {
                            router.push('/user/logout');
                        }
                    }
                ]
            }
        ];
    } else {
        items.value = [
            {
                label: 'User',
                items: [
                    {
                        label: 'Log In',
                        icon: 'pi pi-sign-in',
                        command: () => {
                            router.push('/user/login');
                        }
                    }
                ]
            }
        ];
    }
});

const toggle = (event) => {
    menu.value.toggle(event);
};
</script>

<template>
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" @click="toggleMenu">
                <i class="pi pi-bars"></i>
            </button>
            <router-link to="/" class="layout-topbar-logo">
                <svg viewBox="0 0 20 20" id="meteor-icon-kit__solid-books" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1 4H5C5.55228 4 6 4.44772 6 5V19C6 19.5523 5.55228 20 5 20H1C0.44772 20 0 19.5523 0 19V5C0 4.44772 0.44772 4 1 4zM2 13V17C2 17.5523 2.44772 18 3 18C3.55228 18 4 17.5523 4 17V13C4 12.4477 3.55228 12 3 12C2.44772 12 2 12.4477 2 13zM8 0H12C12.5523 0 13 0.44772 13 1V19C13 19.5523 12.5523 20 12 20H8C7.44772 20 7 19.5523 7 19V1C7 0.44772 7.44772 0 8 0zM9 11V17C9 17.5523 9.4477 18 10 18C10.5523 18 11 17.5523 11 17V11C11 10.4477 10.5523 10 10 10C9.4477 10 9 10.4477 9 11zM15 2H19C19.5523 2 20 2.44772 20 3V19C20 19.5523 19.5523 20 19 20H15C14.4477 20 14 19.5523 14 19V3C14 2.44772 14.4477 2 15 2zM16 15V17C16 17.5523 16.4477 18 17 18C17.5523 18 18 17.5523 18 17V15C18 14.4477 17.5523 14 17 14C16.4477 14 16 14.4477 16 15z"
                        fill="var(--primary-color)"
                    />
                </svg>
                <span>Class Notes</span>
            </router-link>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>
                <div class="relative">
                    <button
                        v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                        type="button"
                        class="layout-topbar-action layout-topbar-action-highlight"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <AppConfigurator />
                </div>
            </div>

            <button
                class="layout-topbar-menu-button layout-topbar-action"
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
            >
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <!-- <button type="button" class="layout-topbar-action">
                        <i class="pi pi-calendar"></i>
                        <span>Calendar</span>
                    </button>
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-inbox"></i>
                        <span>Messages</span>
                    </button> -->
                    <button type="button" class="layout-topbar-action" @click="toggle">
                        <i class="pi pi-user"></i>
                        <span>Profile</span>
                    </button>
                    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
                </div>
            </div>
        </div>
    </div>
</template>
