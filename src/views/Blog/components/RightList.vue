<template>
    <ul class="rightList-container">
        <li v-for="(item, i) in list" :key="i">
            <span @click="handleClick(item)" :class="{ active: item.isSelect }">
                {{ item.name }}
            </span>
            <span
                v-if="item.aside"
                @click="handleClick(item)"
                class="aside"
                :class="{ active: item.isSelect }"
            >
                {{ item.aside }}
            </span>
            <!-- 递归组件，点击触发事件，调用handleClick，继续抛出数据 -->
            <RightList :list="item.children" @selectChange="handleClick" />
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'RightList',
        components: {},
        props: {
            // [ {name: "xxx" ,isSelect: true}, {name: "yyy", isSelect: false, children:[ {name: "iii", isSelect: false} ]} ]
            // name显示的内容， isSelect是否为选中状态，children子项
            list: {
                type: Array,
                default: () => [],
            },
        },
        methods: {
            handleClick(item) {
                //如果当前已经选中，则不触发
                if (!item.isSelect) {
                    this.$emit('selectChange', item);
                }
            },
        },
    };
</script>
<style lang="less" scoped>
    @import '~@/styles/var.less';
    .rightList-container {
        list-style: none;
        padding: 0;
        li {
            min-height: 40px;
            line-height: 40px;
            font-size: 14px;
            cursor: pointer;
            span.active {
                color: @primary !important;
            }
            span.aside {
                color: @lightWords;
                margin-left: 1em;
                font-size: 12px;
            }
            .rightList-container {
                margin-left: 1em;
            }
        }
    }
</style>
