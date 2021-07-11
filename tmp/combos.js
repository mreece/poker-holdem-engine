const CARDS = require("@botpoker/cards");
const getCombinations = require("@botpoker/all-combs");
const _ = require("lodash");
const sortByRank = require("@botpoker/rank-hands");

const hero = [{ rank: "A", type: "C" }, { rank: "A", type: "S" }];
const villain = [{ rank: "10", type: "H" }, { rank: "9", type: "H" }];
// const villain2 = [{ rank: "Q", type: "H" }, { rank: "8", type: "H" }];

const deck = CARDS.slice(0);
_.pullAllWith(deck, [...hero, ...villain], _.isEqual);

// const allBoards = getCombinations(deck, 5);

// const score = { win: 0, lose: 0, tie: 0 };

// allBoards.forEach((board, i) => {
//   const heroBest = sortByRank(getCombinations([...hero, ...board], 5))[0];
//   const villainBest = sortByRank(getCombinations([...villain, ...board], 5))[0];

//   if (i % 10000 === 0) {
//     console.log(allBoards.length - i, score);
//   }

//   const winner = sortByRank([heroBest, villainBest])[0];
//   if (winner.exequo) {
//     score.tie += 1;
//   } else if (_.isEqual(winner, heroBest)) {
//     score.win += 1;
//   } else {
//     score.lose += 1;
//   }
// });

console.log(score);
