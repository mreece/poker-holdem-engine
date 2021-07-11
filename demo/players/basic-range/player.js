"use strict";

const _ = require("lodash");
const { isPreFlop, isFlop, isTurn, isRiver } = require("../utils");
const { handType, HANDS_RANKED_HEADSUP: HANDS_RANKED } = require("../facts");

const minRangeForActiveCount = [
  "72o", // n/a
  "72o", // n/a
  "A2s", // 2
  "A6s", // 3
  "A6s", // 4
  "A6s", // 5
  "JTs", // 6
  "JTs", // 7
  "99p", // 8
  "AKs", // 9
];

// const isGoodHoleCards = (handType) => HANDS_RANKED.indexOf(handType) <= (process.env.RANGE || HANDS_RANKED.indexOf("72o"));
// const isGoodHoleCards = (handType) =>
//   handType.match(/[^2]p/) ||
//   handType.match(/A/) ||
//   handType.match(/K[QJT987]o/) || handType.match(/K[QJT98765]s/) ||
//   handType.match(/Q[JT]o/) || handType.match(/Q[JT98]s/) ||
//   handType.match(/JTs/) ||
//   false;

const preflop = (gamestate) => {
  const me = gamestate.players[gamestate.me];
  const { cards } = me;
  const type = handType(cards);

  if (HANDS_RANKED.indexOf(type) < 0) {
    throw new Error(handType(cards));
  }

  const activePlayers = _.filter(gamestate.players, { state: "active" });
  const activePlayersCount = activePlayers.length;
  const minRange = minRangeForActiveCount[activePlayersCount];

  const isInRange = HANDS_RANKED.indexOf(type) <= HANDS_RANKED.indexOf(minRange);

  if (isInRange) {
    return me.chips;
  }

  return 0;
};

const flop = (gamestate) => {
  return gamestate.callAmount;
};

const turn = (gamestate) => {
  return gamestate.callAmount;
};

const river = (gamestate) => {
  return gamestate.callAmount;
};

const bet = (gamestate) => {
  // console.log({gamestate});
  if (isPreFlop(gamestate)) {
    return preflop(gamestate);
  } else if (isFlop(gamestate)) {
    return flop(gamestate);
  } else if (isTurn(gamestate)) {
    return turn(gamestate);
  } else if (isRiver(gamestate)) {
    return river(gamestate);
  }
};

exports = module.exports = {
  VERSION: "player-one-1.0",
  bet,
};
