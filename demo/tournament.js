"use strict";

const config = require("./demo.json");
const tournamentSettings = require("./tournament-settings.json");

const Tournament = require("../tournament");

let tournament;
const score = {};
let gameCount = 0;

function shuffleArray (arrayIn) {
  const array = [...arrayIn];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

process.on("message", (msg) => {
  switch (msg.topic) {
    case "create":
      tournament = new Tournament(
        "Demo",
        shuffleArray(config.players.slice()),
        tournamentSettings,
        {
          autoStart: true,
          async onFeed (feed) {
            // console.log("****");
            // console.log(JSON.stringify(feed.players, null, 2));
            // console.log("****");
          },
          async onGameComplete (chart) {
            gameCount += 1;
            console.log(`**** Game completed ${gameCount} ****`);
            console.log(chart);
            chart.forEach(row => {
              score[row.playerName] ||= 0;
              score[row.playerName] += row.points;
            });
            console.log("score", gameCount, ":", Object.keys(score).sort((a, b) => score[b] - score[a]).slice(0, 6).map((player) => `\t${player} ${score[player]}`).join(" "));
            console.log("************************");
          },
          async onTournamentComplete (data) {
            console.log("**** Completed ****");
            const winner = Object.keys(score).sort((a, b) => ((score[b] - score[a]) || (a > b ? 1 : -1)))[0];
            console.log("final score", gameCount, ":", Object.keys(score).sort().slice(0, 6).map((player) => `\t${player} ${score[player]}`).join(" "), winner === "player-one" ? " ***" : "");
            quit();
          },
        }
      );
      break;

    case "pause":
    case "restart":
      tournament[msg.topic]();
      break;

    default:
      console.log(`[${msg.topic}]: ${msg.message}.`);
  }

  // Run `quit()` to quit this process.
  // quit();
});

// eslint-disable-next-line no-unused-vars
const quit =
  () => process.send({ topic: "exit" });
