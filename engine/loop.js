"use strict";

const States = require("../domain/tournament/states");

const TASKS = require("./tasks.js");

/**
 * @name loop
 * @this {Tournament}
 */
function loop (LOGGER) {
  return new Promise((resolve, reject) => {
    gameLoop(this, LOGGER, resolve, reject);
  });
}

async function gameLoop (tournament, LOGGER, resolve, reject) {
  try {
    if (tournament.state === States.get("completed")) {
      resolve(true);
      return;
    }
    for (const task of TASKS) {
      if (task.shouldRun(tournament)) {
        LOGGER.debug("[TASK]: " + task.name);
        await task.run(LOGGER, tournament);
      }
    }
    setImmediate(gameLoop, tournament, LOGGER, resolve, reject);
  } catch (e) {
    reject(e);
  }
}

module.exports = loop;
