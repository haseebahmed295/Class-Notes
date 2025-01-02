import '@/assets/styles.scss';
import '@/assets/tailwind.css';
import Aura from '@primevue/themes/aura';
import 'flowbite';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import Tooltip from 'primevue/tooltip';

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});
app.directive('tooltip', Tooltip);
app.use(ToastService);
app.use(ConfirmationService);

app.mount('#app');
