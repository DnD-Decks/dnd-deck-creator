import assert from "node:assert/strict";
import { test } from "node:test";

import { proficiencyDetails } from "./proficiency-details.model.ts";

// --- proficiencyDetails.get ---

test("get light-armor returns full details", () => {
  const p = proficiencyDetails.get({ id: "light-armor" });
  assert.equal(p.id, "light-armor");
  assert.equal(p.label, "Light Armor");
  assert.ok(p.icon, "missing icon");
});

test("get throws on unknown proficiency", () => {
  assert.throws(
    () => proficiencyDetails.get({ id: "spellcasting" as "shields" }),
    /Unknown proficiency/
  );
});

// --- proficiencyDetails.find ---

test("find returns undefined for unknown proficiency", () => {
  assert.equal(proficiencyDetails.find({ id: "spellcasting" }), undefined);
});

test("find shields returns details", () => {
  const p = proficiencyDetails.find({ id: "shields" });
  assert.ok(p !== undefined);
  assert.equal(p.label, "Shields");
});

// --- proficiencyDetails.list ---

test("list returns exactly 6 entries", () => {
  assert.equal(proficiencyDetails.list().length, 6);
});

test("every proficiency has id, label, and icon", () => {
  for (const p of proficiencyDetails.list()) {
    assert.ok(p.id, "missing id");
    assert.ok(p.label, `missing label on ${p.id}`);
    assert.ok(p.icon, `missing icon on ${p.id}`);
  }
});
