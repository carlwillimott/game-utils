const assert = require('assert');

const poker = require('../index').poker;

describe('Poker module', () => {

    it('should find a royal flush', () => {

        // @ TODO

    });

    it('should find a straight flush', () => {

        const test1 = poker.getHands(['2D', '3D', '4D', '5D', '6D']);

        const res1 = {
            success: true,
            solutions: [
                {
                    key: 'SF',
                    description: 'Straight flush',
                    cards: ['2D', '3D', '4D', '5D', '6D']
                }
            ],
            message: '',
            cards: ['2D', '3D', '4D', '5D', '6D']
        };

        assert.deepEqual(test1, res1);

        const test2 = poker.getHands(['2D', '3D', '8C', '6C' , '4D', '5D', '7C', '9C', '6D', '5C']);

        const res2 = {
            success: true,
            solutions: [
                {
                    key: 'SF',
                    description: 'Straight flush',
                    cards: ['5C', '6C', '7C', '8C', '9C']
                },
                {
                    key: 'SF',
                    description: 'Straight flush',
                    cards: ['2D', '3D', '4D', '5D', '6D']
                }

            ],
            message: '',
            cards: ['2D', '3D', '4D', '5D', '5C', '6C', '6D', '7C', '8C', '9C']
        };

        assert.deepEqual(test2, res2);

    });

    it('should find a four of a kind', () => {


        const test1 = poker.getHands(['2S', '2D', '2C', '2H']);

        const res1 = {
            success: true,
            solutions: [
                {
                    key: 'FK',
                    description: 'Four of a kind',
                    cards: ['2S', '2D', '2C', '2H']
                }
            ],
            message: '',
            cards: ['2S', '2D', '2C', '2H']
        };

        assert.deepEqual(test1, res1);

        const test2 = poker.getHands(['2S', '3D', '2D', '3H', '3S', '2C', '3C', '2H']);

        const res2 = {
            success: true,
            solutions: [
                {
                    key: 'FK',
                    description: 'Four of a kind',
                    cards: ['2S', '2D', '2C', '2H']
                },
                {
                    key: 'FK',
                    description: 'Four of a kind',
                    cards: ['3D', '3H', '3S', '3C']
                }
            ],
            message: '',
            cards: ['2S', '2D', '2C', '2H', '3D', '3H', '3S', '3C']
        };

        assert.deepEqual(test2, res2);


    });

});