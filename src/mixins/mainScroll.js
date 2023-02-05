export default function (dom) {
    return {
        methods: {
            handleSetMainScroll(scrollNum) {
                this.$refs[dom].scrollTop = scrollNum;
            },
            handleMainScroll() {
                this.$bus.$emit('mainScroll', this.$refs[dom]);
            },
        },
        mounted() {
            this.$bus.$on('setMainScroll', this.handleSetMainScroll);
            this.$refs[dom].addEventListener('scroll', this.handleMainScroll);
        },
        beforeDestroy() {
            this.$bus.$emit('mainScroll');
            this.$refs[dom].removeEventListener('scroll', this.handleMainScroll);
            this.$bus.$off('setMainScroll', this.handleSetMainScroll);
        },
    };
}
