<template>
    <Layout>
        <div class="main-container" v-Loading="isLoading" ref="container">
            <BlogDetail :blog="data" v-if="data" />
            <BlogComment v-if="!isLoading" />
        </div>
        <template #right>
            <div class="rightMenu" v-Loading="isLoading">
                <BlogToc :toc="data.toc" v-if="data" />
            </div>
        </template>
    </Layout>
</template>

<script>
    import Layout from '@/components/Layout';
    import BlogDetail from './components/BlogDetail.vue';
    import BlogToc from './components/BlogToc.vue';
    import fetchData from '@/mixins/fetchData.js';
    import BlogComment from './components/BlogComment.vue';
    import { getBlog } from '@/api/blog';
    import mainScroll from '@/mixins/mainScroll';
    import { titleController } from '@/utils';
    export default {
        mixins: [fetchData(), mainScroll('container')],
        components: {
            Layout,
            BlogDetail,
            BlogToc,
            BlogComment,
        },
        props: {},
        data() {
            return {};
        },
        methods: {
            async getData() {
                const resp = await getBlog(this.$route.params.id);
                if (resp.title) {
                    titleController.setRouteTitle(resp.title);
                }
                return resp;
            },
        },
        updated() {
            const hash = location.hash;
            location.hash = '';
            setTimeout(() => {
                location.hash = hash;
            }, 50);
        },
    };
</script>
<style lang="less" scoped>
    .main-container {
        overflow-y: scroll;
        scroll-behavior: smooth;
        overflow-x: hidden;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 20px 30px 20px 60px;
        position: relative;
    }
    .rightMenu {
        width: 300px;
        height: 100%;
        padding: 20px;
        position: relative;
        box-sizing: border-box;
        overflow-y: scroll;
        scroll-behavior: smooth;
    }
</style>
