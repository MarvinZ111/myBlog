<template>
    <div class="blogDetail-container">
        <h1>{{ blog.title }}</h1>
        <div class="aside">
            <span>日期：{{ blog.createDate }}</span>
            <span>浏览量{{ blog.scanNumber }}</span>
            <a href="#data-form-container">评论{{ blog.commentNumber }}</a>
            <RouterLink
                :to="{
                    name: 'CategoryBlog',
                    params: {
                        categoryId: blog.category.id,
                    },
                }"
            >
                {{ blog.category.name }}
            </RouterLink>
        </div>
        <div v-html="blog.htmlContent" class="markdown-body"></div>
    </div>
</template>

<script>
    import 'highlight.js/styles/github.css';
    export default {
        props: {
            blog: {
                type: Object,
                required: true,
            },
        },
    };
</script>
<style lang="less" scoped>
    @import '~@/styles/var.less';
    @import '~@/styles/markdown.css';
    .blogDetail-container {
        .aside {
            font-size: 12px;
            color: @lightWords;
            span,
            a {
                margin-right: 15px;
            }
        }
        .markdown-body {
            margin: 2em 0;
        }
    }
</style>
