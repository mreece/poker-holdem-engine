"use strict";

const { bestUsesCard, bestIncludesCard, isPreFlop, isFlop, isTurn, isRiver, getCurrentBest, getCurrentStrength, outsToImprove } = require("../utils");
const { handType } = require("../facts");

const FAVORITE_HANDS = [
  "22p", "33p", "44p", "55p", "66p", "77p", "88p", "99p", "TTp", "JJp", "QQp", "KKp", "AAp",
  "32s", "43s", "54s", "65s", "76s", "87s", "98s", "T9s",
  "J9s", "JTs", "QTs", "QJs", "KTs", "KJs", "KQs",
  "A2s", "A3s", "A4s", "A5s", "A6s", "A7s", "A8s", "A9s", "ATs", "AJs", "AQs", "AKs",
  "T9o", "JTo", "QJo", "KJo", "KQo", "ATo", "AJo", "AQo", "AKo",
];

const preflop = (gamestate) => {
  const me = gamestate.players[gamestate.me];
  const type = handType(me.cards);

  const isInRange = FAVORITE_HANDS.indexOf(type) >= 0;
  return isInRange ? gamestate.callAmount : 0;
};

const flop = (gamestate) => {
  const me = gamestate.players[gamestate.me];
  const currentBest = getCurrentBest([...me.cards, ...gamestate.commonCards]);
  const currentStrength = getCurrentStrength([...me.cards, ...gamestate.commonCards]);
  const isMine = bestUsesCard({ best: currentBest, cards: me.cards });
  const includesMine = bestIncludesCard({ best: currentBest, cards: me.cards });
  const outs = outsToImprove({ cards: me.cards, commonCards: gamestate.commonCards, minimumStrength: 3 });

  if (
    (currentStrength >= 4 && includesMine) ||
    (currentStrength >= 1 && isMine) ||
    (outs >= 4)
  ) {
    return gamestate.callAmount;
  }
  return 0;
};

const turn = (gamestate) => {
  return flop(gamestate);
};

const river = (gamestate) => {
  return flop(gamestate);
};

exports = module.exports = {
  VERSION: "calling-station-1.0",
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
