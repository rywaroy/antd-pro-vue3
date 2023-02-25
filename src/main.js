import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import PageContainer from './components/PageContainer/index.vue';
import SvgIcon from './components/SvgIcon/index.vue';
import 'ant-design-vue/dist/antd.css';
import './assets/styles/global.less';

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(Antd);

app.component('PageContainer', PageContainer);
app.component('SvgIcon', SvgIcon);

app.mount('#app');
