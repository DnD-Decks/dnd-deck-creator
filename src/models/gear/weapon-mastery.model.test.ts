import assert from "node:assert/strict";
import { test } from "vitest";

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

test("list has at least 8 masteries", () => {
  assert.ok(weaponMastery.list().length >= 8);
});
