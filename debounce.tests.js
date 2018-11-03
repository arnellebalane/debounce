import {describe} from 'riteway';
import sinon from 'sinon';
import debounce from './debounce';

describe('debounce arguments', async assert => {
    assert({
        given: 'no arguments',
        should: 'throw an error',
        actual: null,
        expected: null
    });

    assert({
        given: 'a non-function callback',
        should: 'throw an error',
        actual: null,
        expected: null
    });

    assert({
        given: 'a non-numeric duration',
        should: 'throw an error',
        actual: null,
        expected: null
    });
});

describe('debounce, running at head end', async assert => {
    assert({
        given: 'a callback and a duration',
        should: 'run the callback immediately',
        actual: null,
        expected: null
    });

    assert({
        given: 'call intervals less than the duration',
        should: 'run the callback only once',
        actual: null,
        expected: null
    });

    assert({
        given: 'call intervals less than the duration',
        should: 'run the callback immediately',
        actual: null,
        expected: null
    });

    assert({
        given: 'call intervals equal to the duration',
        should: 'run the callback multiple times for each call',
        actual: null,
        expected: null
    });

    assert({
        given: 'call intervals greater than the duration',
        should: 'run the callback multiple times for each call',
        actual: null,
        expected: null
    });
});

describe('debounce, running at tail end', async assert => {
    assert({
        given: 'a callback, a duration, and tail flag',
        should: 'run the callback after duration has elapsed',
        actual: null,
        expected: null
    });

    assert({
        given: 'call intervals less than the duration',
        should: 'run the callback only once',
        actual: null,
        expected: null
    });

    assert({
        given: 'call intervals less than the duration',
        should: 'run the callback at the end of all calls',
        actual: null,
        expected: null
    });

    assert({
        given: 'call intervals equal to the duration',
        should: 'run the callback multiple times for each call',
        actual: null,
        expected: null
    });

    assert({
        given: 'call intervals greater than the duration',
        should: 'run the callback multiple times for each call',
        actual: null,
        expected: null
    });
});
