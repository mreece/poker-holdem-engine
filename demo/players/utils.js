const _ = require("lodash");
const CARDS = require("@botpoker/cards");
const getAllCombination = require("@botpoker/all-combs");
const sortByRank = require("@botpoker/rank-hands");

const isPreFlop = ({ commonCards }) => commonCards.length === 0;
const isFlop = ({ commonCards }) => commonCards.length === 3;
const isTurn = ({ commonCards }) => commonCards.length === 4;
const isRiver = ({ commonCards }) => commonCards.length === 5;

const flushSuit = (cards) => _.maxBy(_.toPairs(_.countBy(cards, "type")), "1")[0];

const outsToImprove = ({ cards, commonCards, minimumStrength = 1 }) => {
  if (isPreFlop({ commonCards })) {
    return undefined;
  }
  if (isRiver({ commonCards })) {
    return 0;
  }

  if (isFlop({ commonCards })) {
    return "not yet implemented";
  }

  const currentCombos = getAllCombination([...cards, ...commonCards], 5);
  const currentBest = sortByRank(currentCombos)[0];
  const currentStrength = currentBest.rank.strength;

  const deck = _.differenceWith(CARDS, [...cards, ...commonCards], _.isEqual);
  const outs = deck.filter((riverCard) => {
    const newCombos = getAllCombination([...cards, ...commonCards, riverCard]);
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

    // straight must include hole card
    if (newStrength === 4 && !(
      [cards[0].rank, cards[1].rank].includes(newBest.rank.rank) ||
      _.intersection([cards[0].rank, cards[1].rank], newBest.rank.kickers).length
    )) {
      return false;
    }

    // flush must include hole card
    if ((newStrength === 5 || newStrength === 8) && !(
      [cards[0].type, cards[1].type].includes(flushSuit(newBest)) && (
        [cards[0].rank, cards[1].rank].includes(newBest.rank.rank) ||
        _.intersection([cards[0].rank, cards[1].rank], newBest.rank.kickers).length
      )
    )) {
      return false;
    }
    // console.log(riverCard, "==", newBest.rank);

    return true;
  });

  return outs.length;
};

module.exports = {
  isPreFlop,
  isFlop,
  isTurn,
  isRiver,
  outsToImprove,
};
