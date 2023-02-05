// 入口文件
import './mock';
import Vue from 'vue';
import App from './App.vue';
import './styles/global.less';
import router from './router';
import './eventBus';
import store from './store';
store.dispatch('setting/fetchSetting');
import showMessage from './utils/showMessage';
Vue.prototype.$showMessage = showMessage;

// 注册全局指令,指令名称 v-Loading v-LazyImg
import config from './directives/loading';
Vue.directive('Loading', config);
import lazyImg from './directives/lazyImg';
Vue.directive('LazyImg', lazyImg);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
