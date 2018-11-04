import {describe, Try} from 'riteway';
import sinon from 'sinon';
import debounce from './debounce';

const asyncTimeout = (callback, delay) => new Promise(resolve => setTimeout(() => resolve(callback()), delay));

// eslint-disable-next-line require-await
describe('debounce arguments', async assert => {
    assert({
        given: 'no arguments',
        should: 'throw an error',
        actual: Try(debounce),
        expected: new TypeError()
    });

    assert({
        given: 'a non-function callback',
        should: 'throw an error',
        actual: Try(debounce, 'callback', 20),
        expected: new TypeError()
    });

    assert({
        given: 'no duration argument',
        should: 'throw an error',
        actual: Try(debounce, () => { /* Intentionally empty. */ }),
        expected: new TypeError()
    });

    assert({
        given: 'a non-numeric duration',
        should: 'throw an error',
        actual: Try(debounce, () => { /* Intentionally empty. */ }, 'duration'),
        expected: new TypeError()
    });
});

describe('debounce(callback, duration, {immediate=true}): running at head end', async assert => {
    (() => {
        const callback = sinon.spy();
        const debounced = debounce(callback, 20);
        debounced();

        assert({
            given: 'a callback and a duration',
            should: 'run the callback immediately',
            actual: callback.calledOnce,
            expected: true
        });
    })();

    await new Promise(async resolve => {
        const callback = sinon.spy();
        const debounced = debounce(callback, 20);

        debounced();
        await asyncTimeout(debounced, 10);
        await asyncTimeout(debounced, 10);
        await asyncTimeout(debounced, 10);

        assert({
            given: 'call intervals less than the duration',
            should: 'run the callback only once',
            actual: callback.calledOnce,
            expected: true
        });

        resolve();
    });

    await new Promise(async resolve => {
        const callback = sinon.spy();
        const debounced = debounce(callback, 20);

        debounced();

        assert({
            given: 'call intervals less than the duration',
            should: 'run the callback immediately',
            actual: callback.calledOnce,
            expected: true
        });

        await asyncTimeout(debounced, 20);
        await asyncTimeout(debounced, 20);
        await asyncTimeout(debounced, 20);

        assert({
            given: 'call intervals equal to the duration',
            should: 'run the callback once for each call',
            actual: callback.callCount,
            expected: 4
        });

        resolve();
    });

    await new Promise(async resolve => {
        const callback = sinon.spy();
        const debounced = debounce(callback, 20);

        debounced();
        await asyncTimeout(debounced, 25);
        await asyncTimeout(debounced, 25);
        await asyncTimeout(debounced, 25);

        assert({
            given: 'call intervals greater than the duration',
            should: 'run the callback once for each call',
            actual: callback.callCount,
            expected: 4
        });

        resolve();
    });
});

describe('debounce(callback, duration, {immediate=false}): running at tail end', async assert => {
    await new Promise(async resolve => {
        const callback = sinon.spy();
        const debounced = debounce(callback, 20, {immediate: false});

        debounced();

        assert({
            given: 'a callback, a duration, and tail flag',
            should: 'not run the callback immediately',
            actual: callback.notCalled,
            expected: true
        });

        await asyncTimeout(() => { /* Intentionally empty. */ }, 20);

        assert({
            given: 'a callback, a duration, and tail flag',
            should: 'run the callback after duration has elapsed',
            actual: callback.calledOnce,
            expected: true
        });

        resolve();
    });

    await new Promise(async resolve => {
        const callback = sinon.spy();
        const debounced = debounce(callback, 20, {immediate: false});

        debounced();
        await asyncTimeout(debounced, 10);
        await asyncTimeout(debounced, 10);
        await asyncTimeout(debounced, 10);
        await asyncTimeout(() => { /* Intentionally empty. */ }, 20);

        assert({
            given: 'call intervals less than the duration',
            should: 'run the callback only once at the end of all calls',
            actual: callback.calledOnce,
            expected: true
        });

        resolve();
    });

    await new Promise(async resolve => {
        const callback = sinon.spy();
        const debounced = debounce(callback, 20, {immediate: false});

        debounced();
        await asyncTimeout(debounced, 20);
        await asyncTimeout(debounced, 20);
        await asyncTimeout(debounced, 20);
        await asyncTimeout(() => { /* Intentionally empty. */ }, 20);

        assert({
            given: 'call intervals equal to the duration',
            should: 'run the callback once for each call',
            actual: callback.callCount,
            expected: 4
        });

        resolve();
    });

    await new Promise(async resolve => {
        const callback = sinon.spy();
        const debounced = debounce(callback, 20, {immediate: false});

        debounced();
        await asyncTimeout(debounced, 25);
        await asyncTimeout(debounced, 25);
        await asyncTimeout(debounced, 25);
        await asyncTimeout(() => { /* Intentionally empty. */ }, 20);

        assert({
            given: 'call intervals greater than the duration',
            should: 'run the callback once for each call',
            actual: callback.callCount,
            expected: 4
        });

        resolve();
    });
});

// eslint-disable-next-line require-await
describe('debounced function', async assert => {
    const callback = sinon.spy();
    const debounced = debounce(callback, 20);
    const args = [1, 'string', [1, 2, 3], {a: 1}];

    debounced(...args);

    assert({
        given: 'any arguments',
        should: 'pass those arguments to the original callback',
        actual: callback.calledOnceWithExactly(...args),
        expected: true
    });
});
