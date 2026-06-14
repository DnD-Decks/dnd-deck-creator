import assert from "node:assert/strict";
import { test } from "vitest";

import { weapons } from "./weapons.model.ts";

// --- weapons.get ---

test("get longsword returns correct fields", () => {
  const w = weapons.get({ id: "longsword" });
  assert.equal(w.id, "longsword");
  assert.equal(w.name, "Longsword");
  assert.equal(w.proficiency, "martial");
  assert.equal(w.range, "melee");
  assert.equal(w.damage.dice, "1d8");
  assert.equal(w.damage.type, "slashing");
  assert.equal(w.mastery, "sap");
});

test("get dagger returns correct proficiency and range", () => {
  const w = weapons.get({ id: "dagger" });
  assert.equal(w.proficiency, "simple");
  assert.equal(w.range, "melee");
  assert.equal(w.damage.type, "piercing");
});

test("get throws on unknown weapon", () => {
  assert.throws(() => weapons.get({ id: "excalibur" as "longsword" }), /Unknown weapon/);
});

// --- weapons.find ---

test("find returns undefined for unknown weapon", () => {
  assert.equal(weapons.find({ id: "excalibur" }), undefined);
});

test("find shortbow returns correct fields", () => {
  const w = weapons.find({ id: "shortbow" });
  assert.ok(w !== undefined);
  assert.equal(w.range, "ranged");
  assert.equal(w.proficiency, "simple");
});

// --- weapons.list ---

test("list returns exactly 38 weapons", () => {
  assert.equal(weapons.list().length, 38);
});

test("every weapon has required fields", () => {
  for (const w of weapons.list()) {
    assert.ok(w.id, "missing id");
    assert.ok(w.name, `missing name on ${w.id}`);
    assert.ok(w.damage.dice, `missing damage dice on ${w.id}`);
    assert.ok(w.damage.type, `missing damage type on ${w.id}`);
    assert.ok(w.mastery, `missing mastery on ${w.id}`);
  }
});

test("list contains both simple and martial weapons", () => {
  const all = weapons.list();
  assert.ok(all.some((w) => w.proficiency === "simple"));
  assert.ok(all.some((w) => w.proficiency === "martial"));
});

test("list contains both melee and ranged weapons", () => {
  const all = weapons.list();
  assert.ok(all.some((w) => w.range === "melee"));
  assert.ok(all.some((w) => w.range === "ranged"));
});
