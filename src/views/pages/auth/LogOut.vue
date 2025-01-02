<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(async () => {
    try {
        // Optional: Notify the server to invalidate the token
        const token = localStorage.getItem('access_token');
    } catch (error) {
        console.error('Error during logout:', error);
    } finally {
        // Clear authentication data
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        // Redirect to login page
        router.push('/user/login');
    }
});
</script>

<template></template>
