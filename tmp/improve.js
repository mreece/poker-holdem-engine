const { outsToImprove } = require("../demo/players/utils");

console.log(outsToImprove({
  cards: [{ rank: "3", type: "S" }, { rank: "4", type: "D" }],
  commonCards: [
    { rank: "J", type: "D" },
    { rank: "8", type: "S" },
    { rank: "7", type: "S" },
    { rank: "6", type: "S" },
  ],
}));
