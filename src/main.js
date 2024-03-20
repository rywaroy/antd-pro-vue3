import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import PageContainer from './components/PageContainer/index.vue';
import SvgIcon from './components/SvgIcon/index.vue';
import BaseSearchForm from './components/BaseSearchForm/index.vue';
import BaseModalForm from './components/BaseModalForm/index.vue';
import permission from './directive/permission';
import './assets/styles/global.less';

import 'virtual:uno.css';

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(Antd);

app.component('PageContainer', PageContainer);
app.component('SvgIcon', SvgIcon);
app.component('BaseSearchForm', BaseSearchForm);
app.component('BaseModalForm', BaseModalForm);

app.directive('permission', permission);

app.mount('#app');
