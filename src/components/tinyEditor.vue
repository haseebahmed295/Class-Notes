<script setup>
import Editor from '@tinymce/tinymce-vue';
import { ref, onMounted } from 'vue';
import { checkLoginStatus } from '../server/Data.vue';

const editorContent = ref('');
const emit = defineEmits(['update:modelValue']);

const handleEditorChange = (content) => {
    editorContent.value = content;
    emit('update:modelValue', content);
    // console.log(editorContent.value);
};
const isLoggedIn = ref(false);

onMounted(async () => {
    isLoggedIn.value = await checkLoginStatus();
});
</script>

<template>
    <div v-if="isLoggedIn">
        <Editor
            api-key="zlrgc4ot1yfk4gy1o7mx5qacnb07t6y1q4d46zhd6894kcvc"
            v-model="editorContent"
            :init="{
                plugins: [
                    'accordion',
                    'advlist',
                    'autolink',
                    'link',
                    'image',
                    'lists',
                    'charmap',
                    'preview',
                    'anchor',
                    'pagebreak',
                    'searchreplace',
                    'wordcount',
                    'visualblocks',
                    'visualchars',
                    'code',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'table',
                    'emoticons',
                    'help',
                    'autoresize',
                    'codesample',
                    'directionality',
                    'lists advlist',
                    'nonbreaking',
                    'quickbars',
                    'searchreplace'
                ],
                quickbars_insert_toolbar: 'quicktable image media codesample',
                quickbars_selection_toolbar: 'bold italic underline fontsize | blocks | bullist numlist | blockquote quicklink',
                contextmenu: 'undo redo | inserttable | cell row column deletetable | help',
                toolbar: 'undo redo | styles | bold italic forecolor backcolor emoticons | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent accordion | link image | print preview media',
                selector: 'textarea',
                license_key: 'gpl',
                resize: false,
                min_height: 400,
                setup: (editor) => {
                    editor.on('input , paste', () => {
                        handleEditorChange(editor.getContent());
                    });
                }
            }"
        />
    </div>
</template>
