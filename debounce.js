export default function debounce(callback, duration, {immediate=true}={}) {
    if (typeof callback !== 'function') {
        throw new TypeError('Invalid type for callback parameter.');
    } else if (typeof duration !== 'number') {
        throw new TypeError('Invalid type for duration parameter.');
    }

    let timer = null;

    return function debounced(...args) {
        if (immediate && !timer) {
            callback(...args);
        }

        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            if (!immediate) {
                callback(...args);
            }
        }, duration);
    };
}
