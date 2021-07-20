"use strict";

const { isPreFlop, isFlop, isTurn, isRiver } = require("../utils");
const { handType, HANDS_RANKED_HEADSUP: HANDS_RANKED } = require("../facts");

const isGoodHoleCards = (handType) => HANDS_RANKED.indexOf(handType) <= (process.env.RANGE || HANDS_RANKED.indexOf("T9s"));

const preflop = (gamestate) => {
  const cards = gamestate.players[gamestate.me].cards;
  const type = handType(cards);
  if (HANDS_RANKED.indexOf(type) < 0) {
    throw new Error(handType(cards));
  }
  if (isGoodHoleCards(type)) {
    return gamestate.spinCount ? gamestate.callAmount : gamestate.minimumRaiseAmount;
  } else {
    return 0;
  }
};

const flop = (gamestate) => {
  return gamestate.spinCount ? gamestate.callAmount : gamestate.minimumRaiseAmount;
};

const turn = (gamestate) => {
  return gamestate.spinCount ? gamestate.callAmount : gamestate.minimumRaiseAmount;
};

const river = (gamestate) => {
  return gamestate.spinCount ? gamestate.callAmount : gamestate.minimumRaiseAmount;
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
