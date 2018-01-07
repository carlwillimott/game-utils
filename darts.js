const darts = function(score) {

    let response = {
        success: false,
        solutions: [],
        message: ''

    };

    if (!this.checkValidScore(score)) {
        response.message = 'Please enter a score between 2 and 170 inclusive.';
        return response;
    }

    const solutions = this.findSolutions(score);

    if (solutions) {
        response.solutions = solutions;
        response.success = true;
        response.message = 'A total of ' + solutions.length + ' solutions were found.'
    } else {
        response.message = 'Unable to find any solutions.';
    }

    return response;

};


darts.prototype.findSolutions = function(score) {

    const singles = this.generateOptions('S', 1, false);
    const doubles = this.generateOptions('D', 2, true);
    const trebles = this.generateOptions('T', 3, false);

    let extra = [
        { name: 'OB', value: 25, finish: false },
        { name: 'IB', value: 50, finish: true },
    ];

    let options = [].concat(trebles).concat(doubles).concat(singles).concat(extra);

    options = this.removeLargeValues(options, score);

    options.sort(this.sortScores);

    return this.getPermutations(score, options);

};

darts.prototype.generateOptions = function (prefix, multiplier, finish) {
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

darts.prototype.sortScores = function (score1, score2) {
    if(score1.value < score2.value) return 1;
    if(score2.value < score1.value) return -1;
    return 0;
};

darts.prototype.removeLargeValues = function(options, score) {
    return options.filter(option => option.value <= score);
};

darts.prototype.getPermutations = function(score, options, darts) {

    // let results = [];
    //
    // for (let i = 0; i < options.length; i++) {
    //
    //     for (let j = 0; j < options.length; j++) {
    //
    //         for (let k = 0; k < options.length; k++) {
    //
    //         }
    //
    //     }
    //
    //     if (options[i].value <= score) {
    //         results.push([options[i]]);
    //     }
    // }
    //
    // return results;

    return options;

};

darts.prototype.formatResponse = function(items) {
    let res = '';
    items.map(item => res += item.name + ', ');
    return res;
};

darts.prototype.totalIsValid = function(score, items) {
    let sum = 0;
    items.map(item => sum += item.value);
    return sum === score;
};

darts.prototype.checkValidScore = function(score) {
    return score !== null && Number.isInteger(score) && score >= 2 && score <= 170;
};

darts.prototype.checkValidDarts = function(darts) {
    return Number.isInteger(darts) && darts >= 1 && darts <= 3;
};


module.exports = darts;