<template>
    <div class="blogComment-container">
        <MessageArea
            title="评论"
            :subTitle="`(${data.total})`"
            :list="data.rows"
            :isListLoading="isLoading"
            @submit="handleSubmit"
        />
    </div>
</template>

<script>
    import MessageArea from '@/components/MessageArea';
    import fetchData from '@/mixins/fetchData';
    import { getComments, postComment } from '@/api/blog';
    export default {
        mixins: [fetchData({ total: 0, rows: [] })], //默认总评论数为0，评论信息为空
        data() {
            return {
                blogId: this.$route.params.id,
                page: 1,
                limit: 10,
            };
        },
        computed: {
            //是否还能加载更多的评论
            hasMoreComments() {
                return this.data.rows.length < this.data.total;
            },
        },
        components: {
            MessageArea,
        },
        methods: {
            async getData() {
                return await getComments(this.blogId, this.page, this.limit);
            },
            async getMoreComments() {
                //只有 还有剩余的评论才会调用
                if (this.hasMoreComments) {
                    this.isLoading = true;
                    this.page++;
                    const resp = await this.getData();
                    this.data.total = resp.total;
                    this.data.rows = this.data.rows.concat(resp.rows);
                    this.isLoading = false;
                }
            },
            async handleSubmit(formData, callback) {
                const resp = await postComment({ blogId: this.blogId, ...formData });
                this.data.rows.unshift(resp);
                this.data.total++;
                callback('评论成功'); //处理完成，回调函数执行
            },
            async handleScroll(dom) {
                //这里dom是Detail里调用$emit传入的dom元素：main-container
                if (this.isLoading || !dom) {
                    //如果当前正在加载或者dom元素已经消失，直接结束
                    return;
                }
                const range = 100; //定义一个范围，误差在100以内都算到达了底步
                //距离顶部距离 + 可见高度  - dom整体高度
                const result = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
                if (result <= 100) {
                    this.getMoreComments();
                }
            },
        },
        created() {
            this.$bus.$on('mainScroll', this.handleScroll);
        },
        destroyed() {
            this.$bus.$off('mainScroll', this.handleScroll);
        },
    };
</script>
<style lang="less" scoped>
    .blogComment-container {
        margin: 30px 0;
    }
</style>
