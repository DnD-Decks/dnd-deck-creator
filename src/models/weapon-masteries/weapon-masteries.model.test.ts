import assert from "node:assert/strict";
import { test } from "vitest";

import { weaponMasteries } from "./weapon-masteries.model.ts";

test("fighter gets all 8 mastery cards", () => {
  const result = weaponMasteries.findAll({ cls: "fighter" });
  assert.equal(result.length, 8);
});

test("non-fighter classes get no mastery cards", () => {
  assert.deepEqual(weaponMasteries.findAll({ cls: "wizard" }), []);
  assert.deepEqual(weaponMasteries.findAll({ cls: "barbarian" }), []);
  assert.deepEqual(weaponMasteries.findAll({ cls: "bard" }), []);
});
