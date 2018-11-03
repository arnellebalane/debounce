export default function debounce(callback, duration, runAtStart=true) {
    if (typeof callback !== 'function') {
        throw new TypeError('Invalid type for callback parameter.');
    } else if (typeof duration !== 'number') {
        throw new TypeError('Invalid type for duration parameter.');
    }

    let timer = null;

    return (...args) => {
        if (runAtStart && !timer) {
            callback(...args);
        }

        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            if (!runAtStart) {
                callback(...args);
            }
        }, duration);
    };
};
