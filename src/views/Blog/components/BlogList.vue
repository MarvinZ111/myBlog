<template>
    <div class="blogList-container" v-Loading="isLoading" ref="container">
        <ul>
            <li v-for="item in data.rows" :key="item.id">
                <div class="thumb" v-if="item.thumb">
                    <RouterLink
                        :to="{
                            name: 'BlogDetail',
                            params: {
                                id: item.id,
                            },
                        }"
                    >
                        <img v-LazyImg="item.thumb" :alt="item.title" :title="item.title" />
                    </RouterLink>
                </div>
                <div class="main">
                    <RouterLink
                        :to="{
                            name: 'BlogDetail',
                            params: {
                                id: item.id,
                            },
                        }"
                    >
                        <h2>{{ item.title }}</h2>
                    </RouterLink>
                    <div class="aside">
                        <span>日期：{{ item.createDate }}</span>
                        <span>浏览：{{ item.scanNumber }}</span>
                        <span>评论{{ item.commentNumber }}</span>
                        <RouterLink
                            :to="{
                                name: 'CategoryBlog',
                                params: {
                                    categoryId: item.category.id,
                                },
                            }"
                        >
                            {{ item.category.name }}
                        </RouterLink>
                    </div>
                    <div class="desc">
                        {{ item.description }}
                    </div>
                </div>
            </li>
        </ul>
        <Pager
            v-if="data.total"
            :current="routeInfo.page"
            :total="data.total"
            :limit="routeInfo.limit"
            :visibleNumber="10"
            @pageChange="hanlePageChange"
        />
    </div>
</template>
<script>
    import Pager from '@/components/Pager';
    import { getBlogs } from '@/api/blog';
    import fetchData from '@/mixins/fetchData.js';
    import mainScroll from '@/mixins/mainScroll.js';
    export default {
        mixins: [fetchData({}), mainScroll('container')],
        components: {
            Pager,
        },
        computed: {
            routeInfo() {
                //$route 获取到的值为String
                const categoryId = +this.$route.params.categoryId || -1; // 分类 -1 全部分类
                const page = +this.$route.query.page || 1; // 页码
                const limit = +this.$route.query.limit || 10; // 页容量
                return {
                    categoryId,
                    page,
                    limit,
                };
            },
        },
        methods: {
            async getData() {
                return await getBlogs(
                    this.routeInfo.page,
                    this.routeInfo.limit,
                    this.routeInfo.categoryId
                );
            },
            hanlePageChange(newPageNumber) {
                const query = {
                    page: newPageNumber,
                    limit: this.routeInfo.limit,
                };
                //跳转到 当前分类的id 当前的页容量 newPageNumber的页码
                if (this.routeInfo.categoryId === -1) {
                    //当前并没有分类
                    this.$router.push({
                        name: 'Blog',
                        query,
                    });
                } else {
                    this.$router.push({
                        name: 'CategoryBlog',
                        query,
                        params: {
                            categoryId: this.routeInfo.categoryId,
                        },
                    });
                }
            },
        },
        watch: {
            async $route() {
                this.isLoading = true;
                this.$refs.container.scrollTop = 0;
                this.data = await this.getData();
                this.isLoading = false;
            },
        },
    };
</script>
<style scoped lang="less">
    @import '~@/styles/var.less';
    .blogList-container {
        line-height: 1.7;
        position: relative;
        padding: 20px 40px;
        overflow-y: scroll;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        scroll-behavior: smooth; //平滑滚动
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }
    }
    li {
        display: flex;
        padding: 15px 0;
        border-bottom: 1px solid @gray;
        .thumb {
            flex: 0 0 auto;
            margin-right: 15px;
            img {
                display: block;
                max-width: 200px;
                border-radius: 5px;
            }
        }
        .main {
            flex: 1 1 auto;
            h2 {
                margin: 0;
            }
        }
        .aside {
            font-size: 12px;
            color: @gray;
            span {
                margin-right: 15px;
            }
        }
        .desc {
            margin: 15px 0;
            font-size: 14px;
        }
    }
</style>
