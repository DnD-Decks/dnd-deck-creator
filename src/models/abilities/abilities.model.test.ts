import assert from "node:assert/strict";
import { test } from "node:test";

import { abilities, computeModifier } from "./abilities.model.ts";

// --- computeModifier ---

test("computeModifier: 10 → 0", () => {
  assert.equal(computeModifier(10), 0);
});

test("computeModifier: 16 → 3", () => {
  assert.equal(computeModifier(16), 3);
});

test("computeModifier: 8 → -1", () => {
  assert.equal(computeModifier(8), -1);
});

test("computeModifier: 15 → 2", () => {
  assert.equal(computeModifier(15), 2);
});

// --- abilities.get ---

test("get str returns correct details", () => {
  const str = abilities.get({ id: "str" });
  assert.equal(str.id, "str");
  assert.equal(str.label, "Strength");
  assert.equal(str.short, "STR");
});

test("get throws on unknown ability", () => {
  assert.throws(() => abilities.get({ id: "luck" as "str" }), /Unknown ability/);
});

// --- abilities.list ---

test("list returns all six abilities in canonical order", () => {
  const ids = abilities.list().map((a) => a.id);
  assert.deepEqual(ids, ["str", "dex", "con", "int", "wis", "cha"]);
});

test("every ability has id, label, and short", () => {
  for (const a of abilities.list()) {
    assert.ok(a.id, "missing id");
    assert.ok(a.label, `missing label on ${a.id}`);
    assert.ok(a.short, `missing short on ${a.id}`);
  }
});
