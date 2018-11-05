// @flow

type DebounceOptions = {
    immediate?: boolean
};

export default function debounce(
    callback: Function,
    duration: number,
    {immediate=true}: DebounceOptions={}
): Function {
    if (typeof callback !== 'function') {
        throw new TypeError('Invalid type for callback parameter.');
    } else if (typeof duration !== 'number') {
        throw new TypeError('Invalid type for duration parameter.');
    }

    let timer = null;

    return function debounced(...args: any) {
        if (immediate && !timer) {
            callback(...args);
        }

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            timer = null;
            if (!immediate) {
                callback(...args);
            }
        }, duration);
    };
}
