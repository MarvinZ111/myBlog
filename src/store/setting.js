import { getSetting } from '@/api/setting';
import { titleController } from '@/utils';
export default {
    namespaced: true,
    state: {
        data: '',
    },
    mutations: {
        setData(state, payload) {
            state.data = payload;
        },
    },
    actions: {
        async fetchSetting(ctx) {
            const data = await getSetting();
            ctx.commit('setData', data);
            if (data.favicon) {
                // <link rel="shortcut icon " type="images/x-icon" href="./favicon.ico">
                let link = document.querySelector("link[ref='shortcut icon']");
                if (link) {
                    return;
                }
                link = document.createElement('link');
                link.rel = 'shortcut icon';
                link.type = 'images/x-icon';
                link.href = data.favicon;
                document.querySelector('head').appendChild(link);
            }
            //控制网站标题
            if (data.title) {
                titleController.setSiteTitle(data.title);
            }
        },
    },
};
