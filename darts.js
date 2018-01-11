const getFinishesForScore = function(score) {

    let response = {
        success: false,
        solutions: [],
        message: '',
        score: score

    };

    if (!_checkValidScore(score)) {
        response.message = 'Please enter a score between 2 and 170 inclusive.';
        return response;
    }

    const solutions = _findSolutions(score);

    if (solutions) {
        response.solutions = solutions;
        response.success = true;
        response.message = 'A total of ' + solutions.length + ' solutions were found.'
    } else {
        response.message = 'Unable to find any solutions.';
    }

    return response;

};

const _findSolutions = function(score) {

    const singles = _generateOptions('S', 1, false);
    const doubles = _generateOptions('D', 2, true);
    const trebles = _generateOptions('T', 3, false);

    let extra = [
        { name: 'OB', value: 25, finish: false },
        { name: 'IB', value: 50, finish: true },
    ];

    let options = [].concat(trebles).concat(doubles).concat(singles).concat(extra);

    options = _removeLargeValues(options, score);

    options.sort(_sortScores);

    return _getPermutations(score, options);

};

const _generateOptions = function (prefix, multiplier, finish) {
    let values = [];
    for (let i = 1; i <= 20; i++) {
        const name = i.toString();
        values.push({
            name: prefix ? prefix + name : name,
            value: i * multiplier,
            finish: finish
        });
    }
    return values;
};

const _sortScores = function (score1, score2) {
    if(score1.value < score2.value) return 1;
    if(score2.value < score1.value) return -1;
    return 0;
};

const _removeLargeValues = function(options, score) {
    return options.filter(option => option.value <= score);
};

const _getPermutations = function(score, options) {

    let results = [];

    for (let i = 0; i < options.length; i++) {

        if (options[i].value === score && options[i].finish) {
            results.push(options[i].name);
        }

        const filtered1 = _removeLargeValues(options, score - options[i].value);

        for (let j = 0; j < filtered1.length; j++) {

            if (options[i].value + filtered1[j].value === score && filtered1[j].finish) {
                results.push(options[i].name + ' ' + filtered1[j].name);
            }

            const filtered2 = _removeLargeValues(options, score - options[i].value - filtered1[j].value);

            for (let k = 0; k < filtered2.length; k++) {

                if (options[i].value + filtered1[j].value + filtered2[k].value === score && filtered2[k].finish) {
                    results.push(options[i].name + ' ' + filtered1[j].name + ' ' + filtered2[k].name);
                }

            }

        }

    }

    return results;

};

const _checkValidScore = function(score) {
    return score !== null && Number.isInteger(score) && score >= 2 && score <= 170;
};

module.exports = {
    getFinishesForScore,
    _findSolutions,
    _generateOptions,
    _sortScores,
    _removeLargeValues,
    _getPermutations,
    _checkValidScore
};