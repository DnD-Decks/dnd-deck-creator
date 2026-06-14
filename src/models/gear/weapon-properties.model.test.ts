import assert from "node:assert/strict";
import { test } from "node:test";

import { weaponProperties } from "./weapon-properties.model.ts";

// --- weaponProperties.get ---

test("get finesse returns details with description", () => {
  const p = weaponProperties.get({ id: "finesse" });
  assert.equal(p.id, "finesse");
  assert.ok(p.description.length > 0, "missing description");
});

test("get throws on unknown property", () => {
  assert.throws(() => weaponProperties.get({ id: "cursed" }), /Unknown weapon property/);
});

// --- weaponProperties.find ---

test("find returns undefined for unknown property", () => {
  assert.equal(weaponProperties.find({ id: "cursed" }), undefined);
});

test("find heavy returns details", () => {
  const p = weaponProperties.find({ id: "heavy" });
  assert.ok(p !== undefined);
  assert.equal(p.id, "heavy");
});

// --- weaponProperties.list ---

test("list returns exactly 10 properties", () => {
  assert.equal(weaponProperties.list().length, 10);
});

test("every property has id and description", () => {
  for (const p of weaponProperties.list()) {
    assert.ok(p.id, "missing id");
    assert.ok(p.description, `missing description on ${p.id}`);
  }
});
