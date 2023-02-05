import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
Vue.use(VueRouter); // 使用一个vue插件
import { titleController } from '@/utils';

const router = new VueRouter({
    // 配置
    routes, // 路由匹配规则
    mode: 'history',
});
router.afterEach(to => {
    //跳转完成后，设置路由标题
    if (to.meta.title) {
        titleController.setRouteTitle(to.meta.title);
    }
});
export default router;
