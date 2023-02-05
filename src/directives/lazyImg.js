import defaultImg from '@/assets/default.gif';
import eventBus from '@/eventBus';
import debounce from '@/utils/debounce';
let imgs = [];
//调用该函数设置单张图片
function handleSetImage(img) {
    img.dom.src = defaultImg;
    const clientHeight = document.documentElement.clientHeight;
    const rect = img.dom.getBoundingClientRect();
    // const height = rect.height || 150; //元素刚开始没加载出来时，高度为0，给他一个默认高度
    //元素的top大于 -元素自身高度 并且 小于当前适口高度 表示在视口范围内
    if (rect.top >= -rect.height && rect.top < clientHeight) {
        const tempImg = new Image();
        tempImg.onload = () => {
            img.dom.src = tempImg.src;
        };
        tempImg.src = img.src;
        //处理完后在数组里删除元素
        imgs = imgs.filter(i => i !== img);
    }
}
function setImage() {
    for (const img of imgs) {
        handleSetImage(img);
    }
}
function handleScroll() {
    setImage();
}
eventBus.$on('mainScroll', debounce(handleScroll, 50));
export default {
    inserted(el, bindings) {
        const img = {
            dom: el,
            src: bindings.value,
        };
        imgs.push(img);
        //每次添加后直接处理一次
        setImage(img);
    },
    unbind(el) {
        // 当元素解绑时，从数组中删除，不再监听
        imgs = imgs.filter(i => {
            return i.dom !== el;
        });
    },
};
