# Game Utils
A simple helper library for solving problems relating to games.

## Darts
Get a list of possible finishes for a score between 2 and 170 inclusive. Each solution will be listed in the solutions array assuming it matches the following conditions:
* The score matches the target exactly.
* It's possible in 3 darts or less.
* The final dart is a double.

```js
const games = require('./index');

games.darts.getFinishesForScore(170);

{
    success: true,
    score: 170,
    message: '',
    solutions: ['T20 T20 IB']
}

game-utils.darts.getFinishesForScore(180);

{
    success: false,
    score: 180,
    message: 'Please enter a score between 2 and 170 inclusive.',
    solutions: []
}

```