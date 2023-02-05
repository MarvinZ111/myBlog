// 公共的远程获取数据的代码
// 具体的组件中，需要提供一个远程获取数据的方法 getData
export default function (defaultDataValue = null) {
    return {
        data() {
            return {
                isLoading: true,
                data: defaultDataValue,
            };
        },
        //先运行调用mixin的组件的勾子函数created，再运行自身的created
        async created() {
            this.data = await this.getData();
            this.isLoading = false;
        },
    };
}
