import assert from "node:assert/strict";
import { test } from "vitest";

import { weaponMastery } from "./weapon-mastery.model.ts";

// --- weaponMastery.get ---

test("get throws on unknown mastery", () => {
  assert.throws(() => weaponMastery.get({ id: "stab" as "cleave" }), /Unknown weapon mastery/);
});

// --- weaponMastery.find ---

test("find returns undefined for unknown mastery", () => {
  assert.equal(weaponMastery.find({ id: "stab" }), undefined);
});

// --- weaponMastery.list ---

test("list has exactly 8 masteries (2024 rules)", () => {
  assert.equal(weaponMastery.list().length, 8);
});

test("every mastery has a non-empty description", () => {
  for (const m of weaponMastery.list()) {
    assert.ok(m.description.length > 0, `missing description on ${m.id}`);
  }
});
