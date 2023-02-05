<template>
    <div class="site-aside-container">
        <Avatar :url="avatar" />
        <h1 class="title">{{ data.name }}</h1>
        <Menu />
        <Contact />
        <p class="footer">{{ data.icp }}</p>
    </div>
</template>

<script>
    import Avatar from '@/components/Avatar';
    import Menu from './Menu';
    import Contact from './Contact';
    import avatar from './assets/avatar.png';
    import { mapState } from 'vuex';
    export default {
        data() {
            return {
                avatar,
            };
        },
        computed: mapState('setting', ['data']),
        components: {
            Avatar,
            Menu,
            Contact,
        },
    };
</script>

<style scoped lang="less">
    @import '~@/styles/var.less';
    .site-aside-container {
        width: 100%;
        height: 100%;
        background: @dark;
        padding: 20px 0;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .avatar-container {
        margin: 0 auto;
    }
    .footer {
        text-align: center;
        font-size: 12px;
    }
    .title {
        font-size: 1.2em;
        color: #fff;
        text-align: center;
    }
</style>
