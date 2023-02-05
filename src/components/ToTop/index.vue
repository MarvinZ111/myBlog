<template>
    <div class="toTop-container" v-show="show" @click="handleClick">Top</div>
</template>

<script>
    export default {
        data() {
            return {
                show: false,
            };
        },
        methods: {
            handleScroll(dom) {
                if (!dom) {
                    this.show = false;
                    return;
                }
                this.show = dom.scrollTop >= 500;
            },
            handleClick() {
                this.$bus.$emit('setMainScroll', 0);
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
    @import '~@/styles/var.less';
    .toTop-container {
        width: 50px;
        height: 50px;
        position: fixed;
        right: 50px;
        bottom: 50px;
        background-color: @primary;
        line-height: 50px;
        text-align: center;
        border-radius: 50%;
        cursor: pointer;
        user-select: none; //文字不可选中
    }
</style>
