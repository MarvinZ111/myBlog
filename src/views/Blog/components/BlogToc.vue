<template>
    <div class="blogToc-container">
        <h1>目录</h1>
        <RightList :list="tocWithSelect" @selectChange="handleSelectChange" />
    </div>
</template>

<script>
    import RightList from './RightList.vue';
    import { debounce } from '@/utils';
    export default {
        data() {
            return {
                temp: '',
            };
        },
        computed: {
            //根据数据里的anchor数据，递归设置isSelect属性
            tocWithSelect() {
                const getToc = (toc = []) => {
                    return toc.map(t => {
                        return {
                            ...t,
                            isSelect: t.anchor === this.temp,
                            children: getToc(t.children),
                        };
                    });
                };
                return getToc(this.toc);
            },
            doms() {
                const doms = [];
                const addToDoms = (arr = []) => {
                    for (const t of arr) {
                        doms.push(document.getElementById(t.anchor));
                        if (t.children && t.children.length) {
                            addToDoms(t.children);
                        }
                    }
                };
                addToDoms(this.toc);
                return doms;
            },
        },
        components: {
            RightList,
        },
        props: {
            toc: {
                type: Array,
                require: true,
            },
        },
        methods: {
            handleSelectChange(item) {
                location.hash = item.anchor;
            },
            setSelect(selectDom) {
                if (!selectDom) {
                    return;
                }
                const range = 100;
                //每次调用，先清空之前选中的元素
                this.temp = '';
                for (const dom of this.doms) {
                    //当前元素没有选中则进入下一次循环
                    if (!dom) {
                        continue;
                    }
                    //得到当前元素距离顶部的距离
                    const top = dom.getBoundingClientRect().top;
                    if (top >= 0 && top <= range) {
                        //在规定的范围之内
                        this.temp = dom.id;
                    } else if (top > range) {
                        //在范围外的话直接return，等待下一次循环
                        return;
                    } else {
                        //在范围上方，先把自身设为激活，然后等待下一次循环设置新的dom
                        this.temp = dom.id;
                    }
                }
            },
        },
        created() {
            this.setSelectDebounce = debounce(this.setSelect, 50);
            this.$bus.$on('mainScroll', this.setSelectDebounce);
        },
        destroyed() {
            this.$bus.$off('mainScroll', this.setSelectDebounce);
        },
    };
</script>
<style lang="less" scoped>
    .blogToc-container {
        h1 {
            font-weight: bold;
            letter-spacing: 2px;
            font-size: 1em;
            margin: 0;
        }
    }
</style>
