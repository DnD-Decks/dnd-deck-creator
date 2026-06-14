import assert from "node:assert/strict";
import { test } from "node:test";

import { weaponMastery } from "./weapon-mastery.model.ts";

// --- weaponMastery.get ---

test("get cleave returns details with description", () => {
  const m = weaponMastery.get({ id: "cleave" });
  assert.equal(m.id, "cleave");
  assert.ok(m.description.length > 0, "missing description");
});

test("get throws on unknown mastery", () => {
  assert.throws(() => weaponMastery.get({ id: "stab" as "cleave" }), /Unknown weapon mastery/);
});

// --- weaponMastery.find ---

test("find returns undefined for unknown mastery", () => {
  assert.equal(weaponMastery.find({ id: "stab" }), undefined);
});

test("find vex returns details", () => {
  const m = weaponMastery.find({ id: "vex" });
  assert.ok(m !== undefined);
  assert.equal(m.id, "vex");
});

// --- weaponMastery.list ---

test("list returns exactly 8 masteries", () => {
  assert.equal(weaponMastery.list().length, 8);
});

test("every mastery has id and description", () => {
  for (const m of weaponMastery.list()) {
    assert.ok(m.id, "missing id");
    assert.ok(m.description, `missing description on ${m.id}`);
  }
});
