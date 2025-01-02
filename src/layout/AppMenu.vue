<script setup>
import { getmenuitems } from '@/server/Data.vue';
import { onMounted, provide, ref } from 'vue';
import { useRoute } from 'vue-router';
import AppMenuItem from './AppMenuItem.vue';

// Variables and imports
const route = useRoute();
const Dynamic_Items = ref([]);

// Function to fetch menu items
async function initializeMenuItems(data = []) {
    console.log('initializeItems called');
    try {
        if (data.length > 0) {
            Dynamic_Items.value = data;
        } else {
            const items = await getmenuitems();
            Dynamic_Items.value = items;
        }
    } catch (error) {
        console.error('Failed to fetch menu items:', error);
        // Handle the error, e.g., set Dynamic_Items to an empty array or show a message
        Dynamic_Items.value = [];
    }
}

// Call the initialization function before the component is mounted
onMounted(async () => {
    await initializeMenuItems();
});
provide('initializeMenuItems', initializeMenuItems);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in Dynamic_Items" :key="Dynamic_Items">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
