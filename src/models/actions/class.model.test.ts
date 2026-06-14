import assert from "node:assert/strict";
import { test } from "node:test";

import { classActions } from "./class.model.ts";

// --- classActions.get ---

test("get Second Wind returns timing: bonus-action", () => {
  const a = classActions.get({ name: "Second Wind" });
  assert.equal(a.timing, "bonus-action");
  assert.equal(a.classRestriction, "fighter");
});

test("get throws on unknown class action", () => {
  assert.throws(() => classActions.get({ name: "Fly" }), /Unknown class action/);
});

// --- classActions.find ---

test("find returns undefined for unknown action", () => {
  assert.equal(classActions.find({ name: "Fly" }), undefined);
});

// --- classActions.list ---

test("list contains Second Wind and Sneak Attack", () => {
  const all = classActions.list();
  assert.ok(all.some((a) => a.name === "Second Wind"));
  assert.ok(all.some((a) => a.name === "Sneak Attack"));
});

// --- classActions.findAll ---

test("findAll fighter martial: includes Second Wind", () => {
  const result = classActions.findAll({ cls: "fighter", classification: "martial" });
  assert.ok(result.some((a) => a.name === "Second Wind"));
});

test("findAll rogue martial: includes all Cunning Action variants and Sneak Attack", () => {
  const result = classActions.findAll({ cls: "rogue", classification: "martial" });
  assert.ok(result.some((a) => a.name === "Cunning Action: Dash"));
  assert.ok(result.some((a) => a.name === "Sneak Attack"));
});

test("findAll wizard spell-caster: empty (no unrestricted class actions)", () => {
  const result = classActions.findAll({ cls: "wizard", classification: "spell-caster" });
  assert.equal(result.length, 0);
});
