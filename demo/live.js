"use strict";

const childProcess = require("child_process");
const path = require("path");

const chalk = require("chalk");

const config = require("./demo-config");

const [shouldRunTournament] = process.argv.slice(2);

const launchBotServices =
  () => {
    config.players.forEach(
      (player) => {
        if (!player.serviceUrl) {
          return;
        }
        const port = player.serviceUrl.match(/:([\d]{4})\/$/)[1];
        const childWorkingDirectory = path.resolve(process.cwd(), "demo", "players", player.name);

        const settings = {
          cwd: childWorkingDirectory,
          maxBuffer: 10 * 1024 * 1024,
          env: {
            PORT: port,
            ...process.env,
          },
        };

        const child =
          childProcess.exec("node ./index.js", settings, (err, stdout, stderr) => {
            if (err) {
              console.log(chalk.red("An error occurred while trying to open child process"));
              console.log(chalk.red(err.message));
            }
          });

        child.stdout.on("data",
          (data) => {
            console.log(chalk.bold.gray(`${player.name}'s stdout:`), data);
          });

        child.stderr.on("data",
          (data) => {
            console.log(chalk.bold.red(`${player.name}'s stderr:`), data);
          });
      }
    );
  };

const pause =
  (thread) => {
    thread.send({ topic: "pause" });
  };

const resume =
  (thread) => {
    thread.send({ topic: "restart" });
  };

const startTournament =
  () => {
    const thread =
      childProcess.fork(path.join(process.cwd(), "demo", "tournament.js"), process.argv);

    thread.on("message", (msg) => {
      if (msg.topic === "exit") {
        thread.kill();
        process.exit();
      }
    });

    // Listening for the thread's death
    thread.on("exit", (code) => {
      if (code > 0) {
        console.error("Exit with code", code);
      }
    });

    // Start a new tournament
    thread.send({ topic: "create" });

    // Testing pause/resume is working.
    // Issue #6
    // setTimeout(pause, 1000, thread);
    // setTimeout(resume, 10000, thread);
  };

launchBotServices();

if (shouldRunTournament) {
  setTimeout(startTournament, 2000);
}
