import { createApp } from 'vue';
// 修改element-plus主题
import './assets/styles/elementvari.scss';
import App from './App.vue';
import router from './router';
import store from './store';
import useConponents from './components';
import useplugins from './plugins';
import useDirective from './directives';
import 'normalize.css';
// 全局 样式
import './assets/styles/globel.less';
import './assets/font/iconfont/iconfont.css';
const app = createApp(App); // 通过 createApp 初始化 app

app.use(useConponents).use(useplugins).use(useDirective).use(router).use(store).mount('#root'); // 将页面挂载到 root 节点
