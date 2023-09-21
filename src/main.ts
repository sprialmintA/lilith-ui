import { createApp } from 'vue';
import './style/index.less';
import App from './App.vue';
import { router } from './router';
import { store } from './store';
import 'virtual:svg-icons-register';

createApp(App).use(router).use(store).mount('#app');
