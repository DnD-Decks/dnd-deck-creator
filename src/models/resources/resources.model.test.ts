import assert from "node:assert/strict";
import { test } from "node:test";

import { resources } from "./resources.model.ts";

test("wizard has 1 resource (mana)", () => {
  const result = resources.findAll({ cls: "wizard" });
  assert.equal(result.length, 1);
  assert.equal(result[0].id, "wizard-mana");
  assert.equal(result[0].name, "Mana");
});

test("wizard mana recharges on Long Rest", () => {
  const [mana] = resources.findAll({ cls: "wizard" });
  assert.equal(mana.recharge, "Long Rest");
  assert.equal(mana.uses, 2);
});

test("fighter has 1 resource (Second Wind)", () => {
  const result = resources.findAll({ cls: "fighter" });
  assert.equal(result.length, 1);
  assert.equal(result[0].id, "fighter-second-wind");
});

test("fighter Second Wind recharges on Short Rest", () => {
  const [secondWind] = resources.findAll({ cls: "fighter" });
  assert.equal(secondWind.recharge, "Short Rest");
  assert.equal(secondWind.uses, 1);
  assert.equal(secondWind.action, "Bonus Action");
});

test("class without resources returns empty array", () => {
  assert.deepEqual(resources.findAll({ cls: "barbarian" }), []);
  assert.deepEqual(resources.findAll({ cls: "bard" }), []);
});
