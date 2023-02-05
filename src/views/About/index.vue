<template>
    <!-- 网址获取出来并且加载完成后，取消loading效果 -->
    <div class="about-container" v-Loading="loading || !srcLoaded">
        <!-- 加载完成后将srcLoaded设为true -->
        <iframe class="about-content" :src="src" frameborder="0" @load="srcLoaded = true"></iframe>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        data() {
            return {
                srcLoaded: false, //整个网页是否加载完成
            };
        },
        computed: mapState('about', {
            //重命名写法 将src作为获取到的data的名字
            src: 'data',
            loading: 'loading',
        }),
        created() {
            this.$store.dispatch('about/fetchAbout');
        },
    };
</script>

<style lang="less" scoped>
    .about-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }
    .about-content {
        width: 100%;
        height: 100%;
        display: block;
        box-sizing: border-box;
    }
</style>
