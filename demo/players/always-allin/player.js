"use strict";

exports = module.exports = {
  VERSION: "always-minraise-1.0",
  bet: function (gamestate) {
    // console.log(JSON.stringify(gamestate, null, 2));
    const { players } = gamestate;
    const me = players[gamestate.me];
    const { chips } = me;
    // console.log(`Hello! My name is ${gamestate.players[gamestate.me].name}, and I always go all in.`, { chips });
    return chips;
  },
};
