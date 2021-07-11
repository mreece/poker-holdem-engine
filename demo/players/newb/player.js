"use strict";

exports = module.exports = {
  VERSION: "newb folder",
  bet: function (gamestate) {
    console.log(`Hello! My name is ${gamestate.players[gamestate.me].name}, and I always fold.`);

    return 0;
  },
};
