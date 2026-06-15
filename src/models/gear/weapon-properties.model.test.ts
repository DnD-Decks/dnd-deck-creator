import assert from "node:assert/strict";
import { test } from "vitest";

import { weaponProperties } from "./weapon-properties.model.ts";

// --- weaponProperties.get ---

test("get finesse returns details with description", () => {
  const p = weaponProperties.get({ id: "finesse" });
  assert.equal(p.id, "finesse");
  assert.ok(p.description.length > 0, "missing description");
});

test("get throws on unknown property", () => {
  assert.throws(
    () => weaponProperties.get({ id: "cursed" as "finesse" }),
    /Unknown weapon property/
  );
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

test("list has at least 10 properties", () => {
  assert.ok(weaponProperties.list().length >= 10);
});
