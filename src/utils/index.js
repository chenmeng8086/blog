export const debounce = (fun, timeout) => {
    let timer = null;

    return function (...args) {
        const this_ = this;
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function () {
            fun.apply(this_, [...args]);
            clearTimeout(timer);
            timer = null;
        }, timeout);
    };
};
