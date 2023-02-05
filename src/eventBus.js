// const listeners = {};

//事件总线
// export default {
//     //监听某一个事件
//     $on(eventName, handler) {
//         if (!listeners[eventName]) {
//             listeners[eventName] = new Set();
//         }
//         listeners[eventName].add(handler);
//     },
//     //取消监听
//     $off(eventName, handler) {
//         if (listeners[eventName]) {
//             listeners[eventName].delete(handler);
//         } else {
//             return;
//         }
//     },
//     //触发事件
//     $emit(eventName, ...args) {
//         if (listeners[eventName]) {
//             for (const handler of listeners[eventName]) {
//                 handler(...args);
//             }
//         }
//     },
// };
import Vue from 'vue';
// vue 自带 $on $off $emit 事件，可以直接导出一个vue实例，他身上方法依然是这些，两种写法都可以
/**
 * 事件名：mainScroll
 * 含义：主区域滚动条位置变化触发
 * 参数：滚动的dom元素，如果为undefined则代表元素已经销毁
 *
 * 事件名：setMainScroll
 * 含义：设置主区域滚动条高度
 * 参数：滚动高度
 */
const app = new Vue({});
Vue.prototype.$bus = app;

export default app;
