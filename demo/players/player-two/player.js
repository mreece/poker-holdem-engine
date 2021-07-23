"use strict";

const _ = require("lodash");
const { bestUsesCard, bestIncludesCard, isPreFlop, isFlop, isTurn, isRiver, getCurrentBest, outsToImprove } = require("../utils");
const { handType } = require("../facts");

const handsForActiveCount = {
  9: [
    "AAp", "KKp", "QQp", "JJp", "TTp",
    "AKs", "AQs", "AJs", "ATs", "KQs", "KJs", "QJs", "QTs", "JTs",
    "AKo", "AQo", "AJo", "KQo",
  ],
  8: ["KTs"],
  7: ["99p"],
  6: ["88p", "A9s", "J9s", "KJo"],
  5: ["77p", "A8s", "Q9s", "T9s", "QJo", "JTo"],
  4: ["66p", "A7s", "K9s", "98s", "87s", "76s", "ATo", "QTo", "J9o"],
  3: [
    "55p",
    "A6s", "A5s", "A4s", "A3s", "A2s", "K8s", "K7s", "K6s", "K5s", "Q8s", "Q7s", "Q6s",
    "J8s", "J7s", "97s", "96s", "86s", "75s", "65s", "54s", "53s", "52s",
    "A9o", "A8o", "A7o", "A6o", "A5o", "KTo", "Q9o", "T9o", "98o", "87o", "76o",
  ],
  2: [
    "44p", "33p", "22p",
    "K4s", "K3s", "K2s", "64s", "43s",
    "A4o", "A3o", "A2o", "K9o", "65o", "54o", "43o",
  ],
};

const preflop = (gamestate) => {
  const me = gamestate.players[gamestate.me];
  const type = handType(me.cards);

  const activePlayers = _.filter(gamestate.players, { state: "active" });
  const activePlayersCount = activePlayers.length;

  const minActiveCount = Number(_.findKey(handsForActiveCount, hands => hands.includes(type)));
  if (activePlayersCount <= minActiveCount) {
    if (gamestate.spinCount === 0) {
      // console.log("raise", me.cards);
      return Math.min(Math.floor(gamestate.minimumRaiseAmount * 1.25), me.chips);
    }
    return gamestate.callAmount;
  }
  // console.log("fold", me.cards);
  return 0;
};

const flop = (gamestate) => {
  const me = gamestate.players[gamestate.me];
  const currentBest = getCurrentBest([...me.cards, ...gamestate.commonCards]);
  const currentStrength = currentBest.rank.strength;
  const isMine = bestUsesCard({ best: currentBest, cards: me.cards });
  const includesMine = bestIncludesCard({ best: currentBest, cards: me.cards });
  const outs = outsToImprove({ cards: me.cards, commonCards: gamestate.commonCards, minimumStrength: 3 });

  if (currentStrength >= 4 && includesMine) {
    // straight or better hand includes at least one hole card
    return gamestate.spinCount ? gamestate.callAmount : Math.ceil(gamestate.pot / 3);
  }
  if (currentStrength >= 1 && isMine) {
    // pair or better ranks with least one hole card
    return gamestate.spinCount ? gamestate.callAmount : Math.ceil(gamestate.pot / 3);
  }
  if (isMine || outs >= 5) {
    // over card to the board or better than gutshot
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
  VERSION: "player-two-1.0",
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
