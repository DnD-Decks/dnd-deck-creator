import assert from "node:assert/strict";
import { test } from "vitest";

import { weaponProperties } from "./weapon-properties.model.ts";

// --- weaponProperties.get ---

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

// --- weaponProperties.list ---

test("every property has a unique id and a non-empty description", () => {
  const seen = new Set<string>();
  for (const p of weaponProperties.list()) {
    assert.ok(p.id, "missing id");
    assert.ok(!seen.has(p.id), `duplicate property id: ${p.id}`);
    seen.add(p.id);
    assert.ok(p.description.length > 0, `missing description on ${p.id}`);
  }
});
