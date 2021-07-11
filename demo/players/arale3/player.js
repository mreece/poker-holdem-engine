"use strict";

exports = module.exports = {
  VERSION: "arale folder",
  bet: function (gamestate) {
    console.log(`Hello! My name is ${gamestate.players[gamestate.me].name}, and I always fold.`);
    // console.log(JSON.stringify(gamestate, null, 2));

    return 0;
  },
};
