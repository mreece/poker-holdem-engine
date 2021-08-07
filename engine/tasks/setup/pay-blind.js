"use strict";

const task = require("../task");
const nextActive = require("../utils/next-active-player");
const isRunning = require("../utils/is-tournament-running");

const Task = Object.create(task);

Task.name = "Pay Blinds";

Task.shouldRun = isRunning;

Task.run =
  (LOGGER, { gamestate }) => {
    const { sb, ante } = gamestate;
    const bb = sb * 2;
    LOGGER.info(`Blinds are ${sb}/${bb} (${ante})`, { tag: gamestate.handUniqueId });

    const playersCount = gamestate.players.filter(({ state }) => state !== "out").length;
    const indexSB = playersCount === 2
      ? gamestate.dealerPosition // button pays small blind heads up
      : nextActive(gamestate.players, gamestate.dealerPosition);

    gamestate.players[indexSB].pay(gamestate, gamestate.sb);

    const indexBB = nextActive(gamestate.players, indexSB);

    gamestate.players[indexBB].pay(gamestate, 2 * gamestate.sb);
    gamestate.players[indexBB].bigBlind = true;
    LOGGER.info(`${gamestate.players[indexSB].name} pays the small blind.`, { tag: gamestate.handUniqueId });
    LOGGER.info(`${gamestate.players[indexBB].name} pays the big blind.`, { tag: gamestate.handUniqueId });
  };

module.exports = Task;
