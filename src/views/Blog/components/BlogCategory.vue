<template>
    <div class="blogCategory-container" v-Loading="isLoading">
        <h1>文章分类</h1>
        <RightList :list="list" @selectChange="handleSelectChange" />
    </div>
</template>

<script>
    import RightList from './RightList.vue';
    import fetchData from '@/mixins/fetchData.js';
    import { getBlogCategories } from '@/api/blog';
    export default {
        mixins: [fetchData([])],
        components: {
            RightList,
        },
        computed: {
            categoryId() {
                return +this.$route.params.categoryId || -1; // 分类 -1 全部分类
            },
            limit() {
                return +this.$route.query.limit || 10; // 页容量
            },
            list() {
                //文章总数 每一个分类的文章量相加
                const totalArticleCount = this.data.reduce((a, b) => a + b.articleCount, 0);
                //添加一项 全部 id 为 -1（全部分类）
                const result = [
                    { name: '全部', id: -1, articleCount: totalArticleCount },
                    ...this.data,
                ];
                //为每一项添加isSelect 当前的路径categoryId等于当前项的id则选中
                return result.map(item => {
                    return {
                        ...item,
                        isSelect: item.id === this.categoryId,
                        aside: `${item.articleCount}篇`,
                    };
                });
            },
        },
        methods: {
            async getData() {
                return await getBlogCategories();
            },
            handleSelectChange(item) {
                const query = {
                    page: 1, //点击后回到当前分类的第一页
                    limit: this.limit,
                };
                if (item.id === -1) {
                    this.$router.push({
                        name: 'Blog',
                        query,
                    });
                } else {
                    this.$router.push({
                        name: 'CategoryBlog',
                        query,
                        params: {
                            categoryId: item.id,
                        },
                    });
                }
            },
        },
    };
</script>
<style lang="less" scoped>
    .blogCategory-container {
        width: 300px;
        height: 100%;
        box-sizing: border-box;
        padding: 20px;
        position: relative; //loading需要父级定位
        overflow-y: auto;
        scroll-behavior: smooth;
        h1 {
            font-weight: bold;
            letter-spacing: 2px;
            font-size: 1em;
            margin: 0;
        }
    }
</style>
