<script setup>
import Editor from '@/components/tinyEditor.vue';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { addLectureData, checkLoginStatus, getLectureData } from '../server/Data.vue';

const props = defineProps({
    Subject: {
        type: String,
        required: true
    },
    Lecture: {
        type: String,
        required: true
    }
});

// Reactive state for the list of cards
const cards = reactive([]);

// State to track if the editor is visible
const isEditorVisible = ref(false);

// Reactive state to track the content of the new card being added
const content = ref('<p></p>');

// Login status
const isLoggedIn = ref(false);

// Vue Router for redirection
const router = useRouter();

// Function to add a new card
const addNewCard = () => {
    isEditorVisible.value = true;
    content.value = '';
};

// Function to save the new card
const saveNewCard = () => {
    const trimcontent = content.value.trim();
    if (trimcontent) {
        cards.push({ content: content.value });
        addLectureData(props.Subject, props.Lecture, cards.length, content.value);
        isEditorVisible.value = false;
        content.value = '';
    } else {
        console.log('Please enter some content');
    }
};

onMounted(async () => {
    isLoggedIn.value = await checkLoginStatus(); // Check login status on mount

    const lectureData = await getLectureData(props.Subject, props.Lecture);
    if (Array.isArray(lectureData)) {
        cards.push(...lectureData);
    }
});
</script>

<template>
    <div class="space-y-4">
        <!-- Display existing cards -->
        <div v-for="(card, index) in cards" :key="index">
            <Card style="--p-card-shadow: none; --p-card-border-radius: var(--content-border-radius)">
                <template #content>
                    <p v-html="card.content"></p>
                </template>
            </Card>
        </div>

        <!-- Show "Add" section only if the user is logged in -->
        <div v-if="isLoggedIn">
            <!-- Editor for adding a new card -->
            <div class="card editor-card" v-show="isEditorVisible">
                <div class="flex flex-row-reverse ...">
                    <Button
                        icon="pi pi-check"
                        variant="outlined"
                        class="p-4 m-2"
                        rounded
                        aria-label="Filter"
                        @click="saveNewCard"
                        v-tooltip.bottom="{
                            value: 'Save',
                            pt: {
                                arrow: {
                                    style: {
                                        borderBottomColor: 'var(--p-primary-color)'
                                    }
                                },
                                text: '!bg-primary !text-primary-contrast !font-medium'
                            }
                        }"
                    />
                </div>
                <Editor v-model:model-value="content" class="format lg:format-lg dark:format-invert max-w-full" />
            </div>

            <!-- Button to add a new card -->
            <div class="card flex justify-center">
                <Button
                    rounded
                    icon="pi pi-plus"
                    class="p-4 m-2"
                    variant="text"
                    @click="addNewCard"
                    :disabled="isEditorVisible"
                    v-tooltip.bottom="{
                        value: 'Create card',
                        pt: {
                            arrow: {
                                style: {
                                    borderBottomColor: 'var(--p-primary-color)'
                                }
                            },
                            text: '!bg-primary !text-primary-contrast !font-medium'
                        }
                    }"
                />
            </div>
        </div>
    </div>
</template>
