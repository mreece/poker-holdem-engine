const sortCards = require("@botpoker/hand/lib/utils/sort-by-rank");

const HANDS_RANKED_HEADSUP = [
  "AAp", "KKp", "QQp", "JJp", "TTp", "99p", "88p", "AKs", "77p", "AQs",
  "AJs", "AKo", "ATs", "AQo", "AJo", "KQs", "66p", "A9s", "ATo", "KJs",
  "A8s", "KTs", "KQo", "A7s", "A9o", "KJo", "55p", "QJs", "K9s", "A5s",
  "A6s", "A8o", "KTo", "QTs", "A4s", "A7o", "K8s", "A3s", "QJo", "K9o",
  "A5o", "A6o", "Q9s", "K7s", "JTs", "A2s", "QTo", "44p", "A4o", "K6s",
  "K8o", "Q8s", "A3o", "K5s", "J9s", "Q9o", "JTo", "K7o", "A2o", "K4s",
  "Q7s", "K6o", "K3s", "T9s", "J8s", "33p", "Q6s", "Q8o", "K5o", "J9o",
  "K2s", "Q5s", "T8s", "K4o", "J7s", "Q4s", "Q7o", "T9o", "J8o", "K3o",
  "Q6o", "Q3s", "98s", "T7s", "J6s", "K2o", "22p", "Q2s", "Q5o", "J5s",
  "T8o", "J7o", "Q4o", "97s", "J4s", "T6s", "J3s", "Q3o", "98o", "87s",
  "T7o", "J6o", "96s", "J2s", "Q2o", "T5s", "J5o", "T4s", "97o", "86s",
  "J4o", "T6o", "95s", "T3s", "76s", "J3o", "87o", "T2s", "85s", "96o",
  "J2o", "T5o", "94s", "75s", "T4o", "93s", "86o", "65s", "84s", "95o",
  "T3o", "92s", "76o", "74s", "T2o", "54s", "85o", "64s", "83s", "94o",
  "75o", "82s", "73s", "93o", "65o", "53s", "63s", "84o", "92o", "43s",
  "74o", "72s", "54o", "64o", "52s", "62s", "83o", "42s", "82o", "73o",
  "53o", "63o", "32s", "43o", "72o", "52o", "62o", "42o", "32o",
];

const HANDS_RANKED = [
  "AAp", "KKp", "QQp", "AKs", "JJp",
  "AQs", "KQs", "AJs", "KJs", "TTp",
  "AKo", "ATs", "QJs", "KTs", "QTs",
  "JTs", "99p", "AQo", "A9s", "KQo",
  "88p", "K9s", "T9s", "A8s", "Q9s",
  "J9s", "AJo", "A5s", "77p", "A7s",
  "KJo", "A4s", "A3s", "A6s", "QJo",
  "66p", "K8s", "T8s", "A2s", "98s",
  "J8s", "ATo", "Q8s", "K7s", "KTo",
  "55p", "JTo", "87s", "QTo", "44p",
  "22p", "33p", "K6s", "97s", "K5s",
  "76s", "T7s", "K4s", "K2s", "K3s",
  "Q7s", "86s", "65s", "J7s", "54s",
  "Q6s", "75s", "96s", "Q5s", "64s",
  "Q4s", "Q3s", "T9o", "T6s", "Q2s",
  "A9o", "53s", "85s", "J6s", "J9o",
  "K9o", "J5s", "Q9o", "43s", "74s",
  "J4s", "J3s", "95s", "J2s", "63s",
  "A8o", "52s", "T5s", "84s", "T4s",
  "T3s", "42s", "T2s", "98o", "T8o",
  "A5o", "A7o", "73s", "A4o", "32s",
  "94s", "93s", "J8o", "A3o", "62s",
  "92s", "K8o", "A6o", "87o", "Q8o",
  "83s", "A2o", "82s", "97o", "72s",
  "76o", "K7o", "65o", "T7o", "K6o",
  "86o", "54o", "K5o", "J7o", "75o",
  "Q7o", "K4o", "K3o", "96o", "K2o",
  "64o", "Q6o", "53o", "85o", "T6o",
  "Q5o", "43o", "Q4o", "Q3o", "74o",
  "Q2o", "J6o", "63o", "J5o", "95o",
  "52o", "J4o", "J3o", "42o", "J2o",
  "84o", "T5o", "T4o", "32o", "T3o",
  "73o", "T2o", "62o", "94o", "93o",
  "92o", "83o", "82o", "72o",
];

const normalizeCards = (cards) => cards.map(({ rank, type }) => ({ rank: (rank === "10" ? "T" : rank), type }));

const handType = (cards) => {
  const [first, second] = normalizeCards(sortCards(cards));
  if (first.rank === second.rank) {
    return `${first.rank}${second.rank}p`;
  }
  if (first.type === second.type) {
    return `${first.rank}${second.rank}s`;
  }
  return `${first.rank}${second.rank}o`;
};

module.exports = {
  handType,
  HANDS_RANKED,
  HANDS_RANKED_HEADSUP,
};
