import assert from "node:assert/strict";
import { test } from "vitest";

import { feats } from "./feats.model.ts";

test("wizard has 3 feats", () => {
  const result = feats.findAll({ cls: "wizard" });
  assert.equal(result.length, 3);
});

test("wizard feats include Spellcasting, Ritual Adept, Arcane Recovery", () => {
  const ids = feats.findAll({ cls: "wizard" }).map((f) => f.id);
  assert.ok(ids.includes("wizard-spellcasting"));
  assert.ok(ids.includes("wizard-ritual-adept"));
  assert.ok(ids.includes("wizard-arcane-recovery"));
});

test("wizard feats have source 'Wizard Level 1'", () => {
  const result = feats.findAll({ cls: "wizard" });
  assert.ok(result.every((f) => f.source === "Wizard Level 1"));
});

test("fighter has 2 feats", () => {
  const result = feats.findAll({ cls: "fighter" });
  assert.equal(result.length, 2);
});

test("fighter feats include Fighting Style and Weapon Mastery", () => {
  const ids = feats.findAll({ cls: "fighter" }).map((f) => f.id);
  assert.ok(ids.includes("fighter-fighting-style"));
  assert.ok(ids.includes("fighter-weapon-mastery"));
});

test("sorcerer has the Spellcasting feat", () => {
  const ids = feats.findAll({ cls: "sorcerer" }).map((f) => f.id);
  assert.deepEqual(ids, ["sorcerer-spellcasting"]);
});

test("class without feats returns empty array", () => {
  assert.deepEqual(feats.findAll({ cls: "warlock" }), []);
});
