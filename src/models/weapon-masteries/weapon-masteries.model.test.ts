import assert from "node:assert/strict";
import { test } from "vitest";

import { weaponMasteries } from "./weapon-masteries.model.ts";

test("weapon-mastery classes get all 8 mastery cards", () => {
  assert.equal(weaponMasteries.findAll({ cls: "fighter" }).length, 8);
  assert.equal(weaponMasteries.findAll({ cls: "barbarian" }).length, 8);
});

test("classes without the Weapon Mastery feature get no mastery cards", () => {
  assert.deepEqual(weaponMasteries.findAll({ cls: "wizard" }), []);
  assert.deepEqual(weaponMasteries.findAll({ cls: "bard" }), []);
});
