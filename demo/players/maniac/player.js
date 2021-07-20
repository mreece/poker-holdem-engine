"use strict";

const { bestUsesCard, isPreFlop, isFlop, isTurn, isRiver, getCurrentBest, outsToImprove } = require("../utils");
const { handType } = require("../facts");

const preflop = (gamestate) => {
  const me = gamestate.players[gamestate.me];
  const type = handType(me.cards);

  if (type.match(/p|s|A|[KQJT]o/)) {
    return gamestate.spinCount ? gamestate.callAmount : gamestate.pot;
  }
  return 0;
};

const flop = (gamestate) => {
  const me = gamestate.players[gamestate.me];
  const currentBest = getCurrentBest([...me.cards, ...gamestate.commonCards]);
  const currentStrength = currentBest.rank.strength;
  const isMine = bestUsesCard({ best: currentBest, cards: me.cards });
  const outs = outsToImprove({ cards: me.cards, commonCards: gamestate.commonCards, minimumStrength: 3 });

  if (currentStrength >= 2) {
    return gamestate.spinCount ? gamestate.callAmount : gamestate.pot;
  }

  if ((currentStrength >= 1 && isMine) || outs >= 4) {
    return gamestate.callAmount;
  }

  return 0;
};

const turn = (gamestate) => {
  const me = gamestate.players[gamestate.me];
  const currentBest = getCurrentBest([...me.cards, ...gamestate.commonCards]);
  const currentStrength = currentBest.rank.strength;
  const isMine = bestUsesCard({ best: currentBest, cards: me.cards });
  const outs = outsToImprove({ cards: me.cards, commonCards: gamestate.commonCards, minimumStrength: 3 });

  if (currentStrength >= 2) {
    return gamestate.spinCount ? gamestate.callAmount : gamestate.pot;
  }

  if ((currentStrength >= 1 && isMine) || outs >= 8) {
    return gamestate.callAmount;
  }

  return 0;
};

const river = (gamestate) => {
  const me = gamestate.players[gamestate.me];
  const currentBest = getCurrentBest([...me.cards, ...gamestate.commonCards]);
  const currentStrength = currentBest.rank.strength;
  const isMine = bestUsesCard({ best: currentBest, cards: me.cards });

  if (currentStrength >= 3) {
    return gamestate.spinCount ? gamestate.callAmount : gamestate.pot;
  }

  if (currentStrength >= 2 && isMine) {
    return gamestate.callAmount;
  }

  if (currentStrength >= 1 && isMine) {
    return Math.floor(Math.random() * 2) ? 0 : gamestate.callAmount;
  }

  return 0;
};

exports = module.exports = {
  VERSION: "maniac-1.0",
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
