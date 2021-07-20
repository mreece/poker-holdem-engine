const { outsToImprove } = require("../demo/players/utils");

console.log(outsToImprove({
  cards: [{ rank: "J", type: "H" }, { rank: "9", type: "H" }],
  commonCards: [
    { rank: "J", type: "C" },
    { rank: "J", type: "D" },
    { rank: "6", type: "H" },
  ],
  minimumStrength: 3,
}));
