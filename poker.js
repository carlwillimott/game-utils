const v1 = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const v2 = ['S', 'C', 'H', 'D'];

const getHands = function(cards) {

    let response = {
        success: false,
        solutions: [],
        message: '',
        cards
    };

    if (!_checkValidCards(cards)) {
        response.message = 'One or more cards are invalid.';
        return response;
    }

    if (!_checkDuplicateCards(cards)) {
        response.message = 'Please ensure each card is included only once.';
        return response;
    }

    response.solutions = _checkForSolutions(cards);

    response.success = true;

    return response;

};

const _checkForSolutions = function(cards) {


    let temp = {
        RF: [], SF: [], FK: [], FH: [], FL: [],
        ST: [], TK: [], TP: [], PA: [], HC: [],
    };

    let solutions = [];

    cards.sort(_sortCards);

    const total = cards.length;

    // temp.HC = _findHighCard(cards);

    if (total > 1) {
        temp.PA = _findAPair(cards);

        if (total > 2) {
            temp.TK = _findThreeOfAKind(cards);

            if (total > 3) {
                temp.TP = _findTwoPairs(cards, temp);
                temp.FK = _findFourOfAKind(cards);

                if (total > 4) {
                    temp.SF = _findStraightFlush(cards);
                    temp.RF = _findRoyalFlush(cards);
                }

            }

        }

    }

    solutions.push(...temp.RF);
    solutions.push(...temp.SF);
    solutions.push(...temp.FK);
    // solutions.push(..._findFullHouse(cards));
    // solutions.push(..._findFlush(cards));
    // solutions.push(..._findStraight(cards));
    solutions.push(...temp.TK);
    solutions.push(...temp.TP);
    solutions.push(...temp.PA);
    // solutions.push(temp.HC);

    return solutions;
};

const _checkValidCards = function(cards) {

    if (!Array.isArray(cards) || cards.length < 1) {
        return false;
    }

    for (let i = 0; i < cards.length; i++) {

        const len = cards[i].length;

        if (len < 2 || len > 3) {
            return false;
        }

        if (len === 2 && (v1.indexOf(cards[i][0]) === -1 || v2.indexOf(cards[i][1]) === -1)) {
            return false;
        }

        if (len === 3 && (v1.indexOf(cards[i][0] + '' + cards[i][1]) === -1 || v2.indexOf(cards[i][2]) === -1)) {
            return false;
        }

    }

    return true;

};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
const _checkDuplicateCards = function(cards) {

    for (let i = 0; i < cards.length; i++) {

        let indices = [];
        let index = cards.indexOf(cards[i]);

        while (index !== -1) {
            indices.push(index);
            index = cards.indexOf(cards[i], index + 1);
        }

        if (indices.length > 1) {
            return false;
        }

    }

    return true;

};

const _sortCards = function(one, two) {
    const val1 = _getCardValue(one);
    const val2 = _getCardValue(two);
    if (val1 < val2) return -1;
    if (val2 < val1) return 1;
    return 0;
};

const _getCardValue = function(item) {
    if (Number.isInteger(parseInt(item[0]))) return item[0];
    if (item[0] === 'J') return 10;
    if (item[0] === 'Q') return 11;
    if (item[0] === 'K') return 12;
    if (item[0] === 'A') return 13;
};


const _findRoyalFlush = function(cards) {

    const sets = [
        ['10S', 'JS', 'QS', 'KS', 'AS'],
        ['10C', 'JC', 'QC', 'KC', 'AC'],
        ['10H', 'JH', 'QH', 'KH', 'AH'],
        ['10D', 'JD', 'QD', 'KD', 'AD']
    ];

    return _matchSet(sets, cards, 'RF', 'Royal flush');

};

const _findStraightFlush = function(cards) {

    let sets = [];

    let v1Mod = ['A'].concat(v1);

    for (let i = 0; i < v2.length; i++) {

        for (let j = 0; j < v1Mod.length; j++) {

            let inner = [];

            for (let k = 0; k < 5; k++) {

                if (j + k < v1Mod.length - 1) {
                    inner.push(v1Mod[j + k] + v2[i]);
                }

                if (inner.length === 5) {
                    sets.push(inner);
                }

            }

        }

    }

    return _matchSet(sets, cards, 'SF', 'Straight flush');

};

const _findFourOfAKind = function(cards) {

    let sets = [];

    for (let i = 0; i < v1.length; i++) {

        let inner = [];

        for (let j = 0; j < v2.length; j++) {
            inner.push(v1[i] + v2[j]);
        }

        sets.push(inner);
    }

    return _matchSet(sets, cards, 'FK', 'Four of a kind');

};

const _findThreeOfAKind = function(cards) {

    return _matchSet(_kindHelper(3), cards, 'TK', 'Three of a kind');

};

const _findTwoPairs = function(cards, found) {

    let sets = [];

    if (found.PA.length > 1) {

        let current = [];

        for (let i = 0; i < found.PA.length; i++) {
            current.push(found.PA[i].cards);
        }

        let target = [];

        _getAllCombinations(current, 2, target);

        for (let i = 0; i < target.length; i++) {

            let inner = [];

            for (let j = 0; j < target[i].length; j++) {
                inner.push(...target[i][j]);
            }

            if (!_hasDuplicates(inner)) {
                sets.push(inner);
            }

        }

    }

    return _matchSet(sets, cards, 'TP', 'Two pairs');

};

const _findAPair = function(cards) {

    return _matchSet(_kindHelper(2), cards, 'PA', 'Pair');

};

const _matchSet = function(sets, cards, key, description) {

    let found = [];

    if (cards.length >= sets[0].length) {

        for (let i = 0; i < sets.length; i++) {

            let inner = [];

            for (let j = 0; j < cards.length; j++) {
                if (sets[i].indexOf(cards[j]) > -1) {
                    inner.push(cards[j]);
                }
            }

            if (inner.length === sets[0].length) {
                found.push({ key, description, cards: inner });
            }
        }

    }

    return found;

};

const _kindHelper = function(count) {

    let sets = [];

    for (let i = 0; i < v1.length; i++) {

        let inner = [];

        for (let j = 0; j < v2.length; j++) {
            inner.push(v1[i] + v2[j]);
        }

        let target = [];

        _getAllCombinations(inner, count, target);

        sets.push(...target);
    }

    return sets

};

// https://stackoverflow.com/a/7376645
const _hasDuplicates = function (array) {
    return (new Set(array)).size !== array.length;
};

// https://www.ibm.com/developerworks/community/blogs/hazem/entry/javascript_getting_all_possible_combinations?lang=en
const _getCombinations = function(array, size, start, initial, output) {

    if (initial.length >= size) {

        output.push(initial);

    } else {

        for (let i = start; i < array.length; ++i) {
            array[i][Symbol.isConcatSpreadable] = false;
            _getCombinations(array, size, i + 1, initial.concat(array[i]), output);
        }

    }

};

const _getAllCombinations = function(array, size, output) {
    _getCombinations(array, size, 0, [], output);
};


module.exports = {
    getHands
};