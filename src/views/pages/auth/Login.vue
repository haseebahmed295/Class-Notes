<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const toast = useToast();
const username = ref('');
const password = ref('');
// const checked = ref(false);

const handleLogin = async () => {
    if (!username.value || !password.value) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Please enter email and password', life: 3000 });
        return;
    }

    try {
        const response = await axios.post('http://127.0.0.1:8000/user/login', {
            username: username.value,
            password: password.value
        });
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        localStorage.setItem('user_info', JSON.stringify(response.data.user_info));
        // store.setUser(response.data.user, response.data.access_token, response.data.refresh_token);
        toast.add({
            severity: 'success',
            summary: `Hello, ${response.data.user_info.full_name}!`,
            detail: `You have successfully logged in.`,
            life: 3000
        });
        router.push('/');
    } catch (error) {
        if (error.response && error.response.status === 404) {
            error.value = error.response.data.message;
        } else {
            console.error('Login failed:', error);
            error.value = 'An error occurred. Please try again later';
        }

        toast.add({
            severity: 'error',
            summary: 'Login failed',
            detail: error.value,
            life: 3000
        });
    }
};
</script>

<template>
    <FloatingConfigurator />
    <Toast />
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <router-link to="/" class="text-center mb-8">
                        <svg width="400" height="100" viewBox="0 0 20 20" id="meteor-icon-kit__solid-books" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1 4H5C5.55228 4 6 4.44772 6 5V19C6 19.5523 5.55228 20 5 20H1C0.44772 20 0 19.5523 0 19V5C0 4.44772 0.44772 4 1 4zM2 13V17C2 17.5523 2.44772 18 3 18C3.55228 18 4 17.5523 4 17V13C4 12.4477 3.55228 12 3 12C2.44772 12 2 12.4477 2 13zM8 0H12C12.5523 0 13 0.44772 13 1V19C13 19.5523 12.5523 20 12 20H8C7.44772 20 7 19.5523 7 19V1C7 0.44772 7.44772 0 8 0zM9 11V17C9 17.5523 9.4477 18 10 18C10.5523 18 11 17.5523 11 17V11C11 10.4477 10.5523 10 10 10C9.4477 10 9 10.4477 9 11zM15 2H19C19.5523 2 20 2.44772 20 3V19C20 19.5523 19.5523 20 19 20H15C14.4477 20 14 19.5523 14 19V3C14 2.44772 14.4477 2 15 2zM16 15V17C16 17.5523 16.4477 18 17 18C17.5523 18 18 17.5523 18 17V15C18 14.4477 17.5523 14 17 14C16.4477 14 16 14.4477 16 15z"
                                fill="var(--primary-color)"
                            />
                        </svg>
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to Class Notes</div>
                    </router-link>

                    <div>
                        <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Username</label>
                        <InputText id="email1" type="text" placeholder="Username" class="w-full md:w-[30rem] mb-8" v-model="username" />

                        <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>

                        <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                            <!-- <div class="flex items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div> -->
                            <!-- <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot password?</span> -->
                        </div>
                        <Button label="Log In" class="w-full" @click="handleLogin"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
