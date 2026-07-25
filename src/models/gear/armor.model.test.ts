import assert from "node:assert/strict";
import { test } from "vitest";

import { armor } from "./armor.model.ts";

// --- armor.get ---

test("get throws on unknown armor", () => {
  assert.throws(() => armor.get({ id: "mithral-plate" as "shield" }), /Unknown armor/);
});

// --- armor.find ---

test("find returns undefined for unknown armor", () => {
  assert.equal(armor.find({ id: "mithral-plate" }), undefined);
});

// --- armor.list ---

test("every armor entry has a unique id and a valid category", () => {
  const VALID_CATEGORIES = ["light", "medium", "heavy", "shield"];
  const seen = new Set<string>();
  for (const a of armor.list()) {
    assert.ok(a.id, "missing id");
    assert.ok(!seen.has(a.id), `duplicate armor id: ${a.id}`);
    seen.add(a.id);
    assert.ok(VALID_CATEGORIES.includes(a.category), `bad category on ${a.id}: ${a.category}`);
  }
});

test("list contains all four categories", () => {
  const categories = new Set(armor.list().map((a) => a.category));
  assert.ok(categories.has("light"));
  assert.ok(categories.has("medium"));
  assert.ok(categories.has("heavy"));
  assert.ok(categories.has("shield"));
});
