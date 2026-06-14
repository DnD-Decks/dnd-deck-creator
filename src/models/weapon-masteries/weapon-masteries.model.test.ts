import assert from "node:assert/strict";
import { test } from "vitest";

import { weaponMasteries } from "./weapon-masteries.model.ts";

test("list() returns all 8 mastery properties", () => {
  const all = weaponMasteries.list();
  assert.equal(all.length, 8);
});

test("list() includes all expected mastery ids", () => {
  const ids = weaponMasteries.list().map((m) => m.id);
  const EXPECTED = ["cleave", "graze", "nick", "push", "sap", "slow", "topple", "vex"];
  for (const id of EXPECTED) {
    assert.ok(ids.includes(id), `missing mastery: ${id}`);
  }
});

test("fighter gets all 8 mastery cards", () => {
  const result = weaponMasteries.findAll({ cls: "fighter" });
  assert.equal(result.length, 8);
});

test("non-fighter classes get no mastery cards", () => {
  assert.deepEqual(weaponMasteries.findAll({ cls: "wizard" }), []);
  assert.deepEqual(weaponMasteries.findAll({ cls: "barbarian" }), []);
  assert.deepEqual(weaponMasteries.findAll({ cls: "bard" }), []);
});
