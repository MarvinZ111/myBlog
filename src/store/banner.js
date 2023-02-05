import { getBanners } from '@/api/banner';
export default {
    namespaced: true,
    state: {
        loading: false,
        data: [],
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload;
        },
        setData(state, payload) {
            state.data = payload;
        },
    },
    actions: {
        async fetchBanner(ctx) {
            //当data中已经有数据时，不需要再次获取数据
            if (ctx.state.data.length) {
                return;
            }
            ctx.commit('setLoading', true);
            const data = await getBanners();
            ctx.commit('setData', data);
            ctx.commit('setLoading', false);
        },
    },
};
