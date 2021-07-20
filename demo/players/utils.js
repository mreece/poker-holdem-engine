const _ = require("lodash");
const CARDS = require("@botpoker/cards");
const getAllCombination = require("@botpoker/all-combs");
const sortByRank = require("@botpoker/rank-hands");

const isPreFlop = ({ commonCards }) => commonCards.length === 0;
const isFlop = ({ commonCards }) => commonCards.length === 3;
const isTurn = ({ commonCards }) => commonCards.length === 4;
const isRiver = ({ commonCards }) => commonCards.length === 5;

const flushSuit = (cards) => _.maxBy(_.toPairs(_.countBy(cards, "type")), "1")[0];

const getCurrentBest = (cards) => sortByRank(getAllCombination(cards, 5))[0];
const getCurrentStrength = (cards) => getCurrentBest(cards).rank.strength;

const bestUsesCard = ({ best, cards }) => best.rank.rank === cards[0].rank || best.rank.rank === cards[1].rank;
const bestIncludesCard = ({ best, cards }) => _.includes(best, cards[0]) || _.includes(best, cards[1]);

const outsToImprove = ({ cards, commonCards, minimumStrength = 1 }) => {
  if (isPreFlop({ commonCards })) {
    return undefined;
  }
  if (isRiver({ commonCards })) {
    return 0;
  }

  const currentStrength = getCurrentStrength([...cards, ...commonCards]);

  const deck = _.differenceWith(CARDS, [...cards, ...commonCards], _.isEqual);
  const outs = deck.filter((nextCard) => {
    const newCombos = getAllCombination([...cards, ...commonCards, nextCard]);
    const newBest = sortByRank(newCombos)[0];
    const newStrength = newBest.rank.strength;

    if (newStrength < minimumStrength) {
      return false;
    }
    if (newStrength <= currentStrength) {
      return false;
    }

    // pair must pair hold card
    if (newStrength === 1 && ![cards[0].rank, cards[1].rank].includes(newBest.rank.rank)) {
      return false;
    }

    // two pair must pair both hole cards
    if (newStrength === 2 && !(
      [cards[0].rank, cards[1].rank].includes(newBest.rank.rank) &&
      [cards[0].rank, cards[1].rank].includes(newBest.rank.kickers[0])
    )) {
      return false;
    }

    // three of a kind must include hole card
    if (newStrength === 3 && ![cards[0].rank, cards[1].rank].includes(newBest.rank.rank)) {
      return false;
    }

    // other ranks must incldue hole card
    return _.includes(newBest, cards[0]) || _.includes(newBest, cards[1]);
  });

  return outs.length;
};

module.exports = {
  outsToImprove,
  isTurn,
  isRiver,
  isPreFlop,
  isFlop,
  getCurrentStrength,
  getCurrentBest,
  flushSuit,
  bestUsesCard,
  bestIncludesCard,
};
