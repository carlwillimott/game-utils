const assert = require('assert');

const darts = require('../index').darts;

describe('Darts module', () => {

    it('should return all combinations for a particular score', () => {

        assert(darts.getFinishesForScore(180).success === false);
        assert(darts.getFinishesForScore(171).success === false);

        const test170 = darts.getFinishesForScore(170);
        assert(test170.success === true);
        assert.deepEqual(test170.solutions, ['T20 T20 IB']);

        const test160 = darts.getFinishesForScore(160);
        assert(test160.success === true);
        assert.deepEqual(test160.solutions, ['T20 T20 D20', 'T20 IB IB', 'IB T20 IB']);

        const test5 = darts.getFinishesForScore(5);
        assert(test5.success === true);
        assert.deepEqual(test5.solutions, ['T1 D1', 'S3 D1', 'D1 S1 D1', 'S2 S1 D1', 'S1 D2', 'S1 D1 D1', 'S1 S2 D1']);

        const test2 = darts.getFinishesForScore(2);
        assert(test2.success === true);
        assert.deepEqual(test2.solutions, ['D1']);

        assert(darts.getFinishesForScore(1).success === false);

    });

});