<script setup>
import { addLecture, addSubject, getSubjectlist } from '@/server/Data.vue';
import Button from 'primevue/button';
import Select from 'primevue/select';
import { useToast } from 'primevue/usetoast';
import { computed, inject, onBeforeMount, ref, watch } from 'vue';
const toast = useToast();
const initializeMenuItems = inject('initializeMenuItems');
const selectedtype = ref('');
const subselect = ref('');
const name = ref('');
const SubjectInVisible = ref(true);
const ltypes = ref([
    { name: 'Subject', code: 'Subject' },
    { name: 'Lecture', code: 'Lecture' }
]);

const response = ref([]);

const SubjectList = ref([]);

const props = defineProps({
    visible: Boolean
});

const emit = defineEmits(['update:visible']);

// Make a reactive computed prop for visibility
const is_visible = computed({
    get: () => props.visible,
    set: (value) => emit('update:visible', value)
});

watch(is_visible, (newVal) => {
    updatedSubject();});
async function updatedSubject() {
    SubjectList.value = await getSubjectlist();
}


onBeforeMount(async () => {
    try {
        updatedSubject();
    } catch (error) {
        console.error('Error fetching subject list:', error);
    }
});

const show = () => {
    toast.add({ severity: 'success', summary: 'Info', detail: `${selectedtype.value.name} Added Successfully`, life: 3000 });
};

function handleadditem() {
    if (!selectedtype.value) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Please Select Type', life: 3000 });
        return;
    }

    if (selectedtype.value.code === 'Subject') {
        response.value = addSubject(name);
    } else {
        if (!subselect.value) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Please Select Subject Type', life: 3000 });
            return;
        }

        response.value = addLecture(name, subselect);
    }

    if (initializeMenuItems) {
        initializeMenuItems(response);
    } else {
        console.warn('initializeMenuItems is not injected!');
    }

    is_visible.value = false;
    show();
    // Optionally reload the page
    // window.location.reload();
}
</script>

<template>
    <Dialog v-model:visible="is_visible" modal header="Add Item in Menu" :style="{ width: '25rem' }">
        <div class="flex items-center gap-4 mb-4">
            <label for="username" class="font-semibold w-24">Type:</label>
            <Select v-model="selectedtype" :options="ltypes" @change="SubjectInVisible = selectedtype?.code !== 'Lecture'" optionLabel="name" placeholder="Select Type to Add" class="flex-auto w-full md:w-56" />
        </div>

        <div class="flex items-center gap-4 mb-4" v-if="!SubjectInVisible">
            <label class="font-semibold w-24">Subject Type:</label>
            <Select v-model="subselect" :options="SubjectList" optionLabel="name" placeholder="Select Type to Add" class="flex-auto w-full md:w-56" />
        </div>

        <div class="flex items-center gap-4 mb-8">
            <label class="font-semibold w-24">Label:</label>
            <InputText class="flex-auto" autocomplete="off" v-model="name" />
        </div>

        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="is_visible = false"></Button>
            <Button type="button" label="Add" @click="handleadditem" :disabled="!name"></Button>
        </div>
    </Dialog>
</template>
