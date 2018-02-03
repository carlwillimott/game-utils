const assert = require('assert');

const poker = require('../index').poker;

describe('Poker module', () => {

    it('should fail with invalid cards', () => {

        let res = {
            success: false,
            solutions: [],
            message: 'One or more cards are invalid.',
            cards: [],
        };

        const cards1 = ['xx', 'yy', 'zz'];
        const test1 = poker.getHands(cards1);
        res.cards = cards1;
        assert.deepEqual(test1, res);

        const cards2 = ['AD', '11D'];
        const test2 = poker.getHands(cards2);
        res.cards = cards2;
        assert.deepEqual(test2, res);

        const cards3 = [];
        const test3 = poker.getHands(cards3);
        res.cards = cards3;
        assert.deepEqual(test3, res);

        const cards4 = ['2D', 'KD', '4'];
        const test4 = poker.getHands(cards4);
        res.cards = cards4;
        assert.deepEqual(test4, res);

    });

    it('should find a royal flush', () => {

        const test1 = poker.getHands(['10C', 'JC', 'QC', 'KC', 'AC']);

        const res1 = {
            success: true,
            solutions: [
                {
                    key: 'RF',
                    description: 'Royal flush',
                    cards: ['10C', 'JC', 'QC', 'KC', 'AC']
                }
            ],
            message: '',
            cards: ['10C', 'JC', 'QC', 'KC', 'AC']
        };

        assert.deepEqual(test1, res1);

        const test2 = poker.getHands(['10C', 'JC', '2H', 'QC', 'KC', '7S', 'AC']);

        const res2 = {
            success: true,
            solutions: [
                {
                    key: 'RF',
                    description: 'Royal flush',
                    cards: ['10C', 'JC', 'QC', 'KC', 'AC']
                }
            ],
            message: '',
            cards: ['2H', '7S', '10C', 'JC', 'QC', 'KC', 'AC']
        };

        assert.deepEqual(test1, res1);

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
                },
                {
                    key: 'PA',
                    description: 'Pair',
                    cards: ['5D', '5C']
                },
                {
                    key: 'PA',
                    description: 'Pair',
                    cards: ['6C', '6D']
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
                },
                {
                    key: 'TK',
                    description: 'Three of a kind',
                    cards: ['2S', '2C', '2H']
                },
                {
                    key: 'TK',
                    description: 'Three of a kind',
                    cards: ['2S', '2D', '2C']
                },
                {
                    key: 'TK',
                    description: 'Three of a kind',
                    cards: ['2S', '2D', '2H']
                },
                {
                    key: 'TK',
                    description: 'Three of a kind',
                    cards: ['2D', '2C', '2H']
                },
                {
                    key: 'PA',
                    description: 'Pair',
                    cards: ['2S', '2C']
                },
                {
                    key: 'PA',
                    description: 'Pair',
                    cards: ['2S', '2H']
                },
                {
                    key: 'PA',
                    description: 'Pair',
                    cards: ['2S', '2D']
                },
                {
                    key: 'PA',
                    description: 'Pair',
                    cards: ['2C', '2H']
                },
                {
                    key: 'PA',
                    description: 'Pair',
                    cards: ['2D', '2C']
                },
                {
                    key: 'PA',
                    description: 'Pair',
                    cards: ['2D', '2H']
                },
            ],
            message: '',
            cards: ['2S', '2D', '2C', '2H']
        };

    });

    it('should find a full house', () => {
        // @ TODO
    });

    it('should find a flush', () => {
        // @ TODO
    });

    it('should find a straight', () => {
        // @ TODO
    });

    it('should find a three of a kind', () => {

        const test1 = poker.getHands(['7C', '7S', '7D']);

        const res1 = {
            success: true,
            solutions: [
                {
                    key: 'TK',
                    description: 'Three of a kind',
                    cards: ['7C', '7S', '7D']
                },
                {
                    key: 'PA',
                    description: 'Pair',
                    cards: ['7C', '7S']
                },
                {
                    key: 'PA',
                    description: 'Pair',
                    cards: ['7S', '7D']
                },
                {
                    key: 'PA',
                    description: 'Pair',
                    cards: ['7C', '7D']
                }
            ],
            message: '',
            cards: ['7C', '7S', '7D']
        };

        assert.deepEqual(test1, res1);

    });

    it('should find two pairs', () => {
        // @ TODO
    });

    it('should find a pair', () => {

        const test1 = poker.getHands(['2D', '2C', '8S', '7S']);

        const res1 = {
            success: true,
            solutions: [
                {
                    key: 'PA',
                    description: 'Pair',
                    cards: ['2D', '2C']
                }
            ],
            message: '',
            cards: ['2D', '2C', '7S', '8S']
        };

        assert.deepEqual(test1, res1);

        const test2 = poker.getHands(['2S', '4D', '8D', '3C', '7H', 'KD', '9D', 'QS', '7C']);

        const res2 = {
            success: true,
            solutions: [
                {
                    key: 'PA',
                    description: 'Pair',
                    cards: ['7H', '7C']
                }
            ],
            message: '',
            cards: ['2S', '3C', '4D', '7H', '7C', '8D', '9D', 'QS', 'KD']
        };

        assert.deepEqual(test2, res2);

    });

    it('should find a high card', () => {
        // @ TODO
    });

});