import assert from "node:assert/strict";
import { test } from "vitest";

import { armor } from "./armor.model.ts";

// --- armor.get ---

test("get leather-armor returns correct fields", () => {
  const a = armor.get({ id: "leather-armor" });
  assert.equal(a.id, "leather-armor");
  assert.equal(a.name, "Leather Armor");
  assert.equal(a.category, "light");
  assert.equal(a.baseAc, 11);
  assert.equal(a.dexModifier, true);
  assert.equal(a.stealthDisadvantage, false);
});

test("get plate-armor returns correct fields", () => {
  const a = armor.get({ id: "plate-armor" });
  assert.equal(a.category, "heavy");
  assert.equal(a.baseAc, 18);
  assert.equal(a.dexModifier, false);
  assert.equal(a.requiredStr, 15);
  assert.equal(a.stealthDisadvantage, true);
});

test("get shield returns correct fields", () => {
  const a = armor.get({ id: "shield" });
  assert.equal(a.category, "shield");
  assert.equal(a.baseAc, 2);
});

test("get throws on unknown armor", () => {
  assert.throws(() => armor.get({ id: "mithral-plate" as "shield" }), /Unknown armor/);
});

// --- armor.find ---

test("find returns undefined for unknown armor", () => {
  assert.equal(armor.find({ id: "mithral-plate" }), undefined);
});

test("find chain-mail returns details", () => {
  const a = armor.find({ id: "chain-mail" });
  assert.ok(a !== undefined);
  assert.equal(a.category, "heavy");
});

// --- armor.list ---

test("list has at least 13 entries", () => {
  assert.ok(armor.list().length >= 13);
});

test("list contains all four categories", () => {
  const categories = new Set(armor.list().map((a) => a.category));
  assert.ok(categories.has("light"));
  assert.ok(categories.has("medium"));
  assert.ok(categories.has("heavy"));
  assert.ok(categories.has("shield"));
});

test("every armor entry has id, name, and baseAc", () => {
  for (const a of armor.list()) {
    assert.ok(a.id, "missing id");
    assert.ok(a.name, `missing name on ${a.id}`);
    assert.ok(a.baseAc > 0, `invalid baseAc on ${a.id}`);
  }
});
