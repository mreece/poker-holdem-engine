"use strict";

const { isPreFlop, isFlop, isTurn, isRiver } = require("../utils");
const { handType } = require("../facts");

const FAVORITE_HANDS = [
  "AAp", "KKp", "QQp", "JJp", "TTp", "99p", "88p", "77p",
  "AKs", "AQs",
  "AKo", "AQo",
];

const preflop = (gamestate) => {
  const me = gamestate.players[gamestate.me];
  const type = handType(me.cards);
  const isInRange = FAVORITE_HANDS.indexOf(type) >= 0;
  return isInRange ? gamestate.callAmount : 0;
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
  VERSION: "the-mouse-1.0",
  bet: function (gamestate) {
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
