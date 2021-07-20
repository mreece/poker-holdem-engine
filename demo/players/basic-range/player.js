"use strict";

const _ = require("lodash");
const { isPreFlop, isFlop, isTurn, isRiver, getCurrentStrength, outsToImprove } = require("../utils");
const { handType, HANDS_RANKED } = require("../facts");

const minRangeForActiveCount = [
  "72o", // n/a
  "72o", // n/a bb
  HANDS_RANKED[70], // sb
  HANDS_RANKED[50], // btn
  HANDS_RANKED[35], // hj
  HANDS_RANKED[30], // co
  HANDS_RANKED[25],
  HANDS_RANKED[20],
  HANDS_RANKED[15],
  HANDS_RANKED[10], // utg
];

const preflop = (gamestate) => {
  const me = gamestate.players[gamestate.me];
  const type = handType(me.cards);

  if (HANDS_RANKED.indexOf(type) < 0) {
    throw new Error(handType(me.cards));
  }

  const activePlayers = _.filter(gamestate.players, { state: "active" });
  const activePlayersCount = activePlayers.length;
  const minRange = minRangeForActiveCount[activePlayersCount];

  const isInRange = HANDS_RANKED.indexOf(type) <= HANDS_RANKED.indexOf(minRange);

  if (isInRange) {
    if (gamestate.spinCount === 0) {
      return Math.min(Math.floor(gamestate.minimumRaiseAmount * 1.25), me.chips);
    }
    return gamestate.callAmount;
  }

  return 0;
};

const flop = (gamestate) => {
  const me = gamestate.players[gamestate.me];
  const currentStrength = getCurrentStrength([...me.cards, ...gamestate.commonCards]);
  const outs = outsToImprove({ cards: me.cards, commonCards: gamestate.commonCards });

  if (currentStrength >= 3 || outs >= 12) {
    return me.chips;
  }
  if (currentStrength >= 1 || outs >= 7) {
    return gamestate.callAmount;
  }
  return 0;
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
  VERSION: "basic-range-1.0",
  bet,
};
