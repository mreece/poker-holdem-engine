"use strict";

const { isPreFlop, isFlop, isTurn, isRiver } = require("../utils");
const { handType, HANDS_RANKED_HEADSUP: HANDS_RANKED } = require("../facts");

const isGoodHoleCards = (handType) => HANDS_RANKED.indexOf(handType) <= (process.env.RANGE || HANDS_RANKED.indexOf("T9s"));
// const isGoodHoleCards = (handType) =>
//   handType.match(/[^2]p/) ||
//   handType.match(/A/) ||
//   handType.match(/K[QJT987]o/) || handType.match(/K[QJT98765]s/) ||
//   handType.match(/Q[JT]o/) || handType.match(/Q[JT98]s/) ||
//   handType.match(/JTs/) ||
//   false;

const preflop = (gamestate) => {
  const cards = gamestate.players[gamestate.me].cards;
  const type = handType(cards);
  if (HANDS_RANKED.indexOf(type) < 0) {
    throw new Error(handType(cards));
  }
  if (isGoodHoleCards(type)) {
    // console.log("call", type, cards);
    return gamestate.callAmount;
  } else {
    // console.log("fold", type, cards);
    return 0;
  }
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

exports = module.exports = {
  VERSION: "player-one-1.0",
  bet: function (gamestate) {
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
  },
};
