// 公共函数集合

export function throttle(fn, delay) {
    let lastTime = 0;
    let now;
    return function() {
        let _this = this;
        now = +new Date();
        if (now - lastTime >= delay) {
            fn.apply(_this);
            lastTime = now;
        }
    }
}