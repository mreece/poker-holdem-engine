const mbr = require("./players/mbr/player");
const maniac = require("./players/maniac/player");
const alwaysCall = require("./players/always-call/player");
const mouse = require("./players/the-mouse/player");
const alwaysMinraise = require("./players/always-minraise/player");
const callingStation = require("./players/calling-station/player");
const basicRange = require("./players/basic-range/player");
const playerOne = require("./players/player-one/player");
const playerTwo = require("./players/player-two/player");

const config = {
  mongoUri: "mongodb://localhost:27017/store",
  tournamentId: "574e653bbebd5a20064d08fb",
  players: [
    {
      id: "maniac",
      name: "maniac",
      // serviceUrl: "http://127.0.0.1:8081/",
      getBet: maniac.bet,
    },
    {
      id: "always-call",
      name: "always-call",
      // serviceUrl: "http://127.0.0.1:8082/",
      getBet: alwaysCall.bet,
    },
    {
      id: "the-mouse",
      name: "the-mouse",
      // serviceUrl: "http://127.0.0.1:8083/",
      getBet: mouse.bet,
    },
    {
      id: "always-minraise",
      name: "always-minraise",
      // serviceUrl: "http://127.0.0.1:8084/",
      getBet: alwaysMinraise.bet,
    },
    {
      id: "calling-station",
      name: "calling-station",
      // serviceUrl: "http://127.0.0.1:8085/",
      getBet: callingStation.bet,
    },
    {
      id: "basic-range",
      name: "basic-range",
      // serviceUrl: "http://127.0.0.1:8086/",
      getBet: basicRange.bet,
    },
    {
      id: "player-one",
      name: "player-one",
      // serviceUrl: "http://127.0.0.1:8087/",
      getBet: playerOne.bet,
    },
    {
      id: "player-two",
      name: "player-two",
      // serviceUrl: "http://127.0.0.1:8088/",
      getBet: playerTwo.bet,
    },
    {
      id: "mbr",
      name: "mbr",
      // serviceUrl: "http://127.0.0.1:8089/",
      getBet: mbr.bet,
    },
  ],
};

module.exports = config;
