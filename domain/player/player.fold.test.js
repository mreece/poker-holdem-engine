/* eslint-env jest */

"use strict";

const getPlayerFactory = require("./create");
const LOGGER = { warn: jest.fn(), info: jest.fn(), debug: jest.fn() };

it("updates player state", async () => {
  const save = jest.fn();
  const create = getPlayerFactory(LOGGER, save, { BUYIN: 100 });

  const player = create({ id: "a1", name: "Arale", serviceUrl: "http://arale.com/" });

  const gamestate = {
    handUniqueId: 1,
    session: "FLOP",
  };

  await player.fold(gamestate);

  expect(player.state).toBe("fold");
  expect(save).toHaveBeenCalledTimes(1);
  expect(save).toHaveBeenCalledWith(gamestate);
});
