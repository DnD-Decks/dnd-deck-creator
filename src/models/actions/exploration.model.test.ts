import assert from "node:assert/strict";
import { test } from "node:test";

import { explorationActions } from "./exploration.model.ts";

// --- explorationActions.get ---

test("get Search returns category: exploration", () => {
  const a = explorationActions.get({ name: "Search" });
  assert.equal(a.category, "exploration");
});

test("get Influence returns category: social", () => {
  const a = explorationActions.get({ name: "Influence" });
  assert.equal(a.category, "social");
});

test("get throws on unknown exploration action", () => {
  assert.throws(() => explorationActions.get({ name: "Fly" }), /Unknown exploration action/);
});

// --- explorationActions.find ---

test("find returns undefined for unknown action", () => {
  assert.equal(explorationActions.find({ name: "Fly" }), undefined);
});

// --- explorationActions.list ---

test("list contains Hide, Search, and Cast Ritual Spell", () => {
  const all = explorationActions.list();
  assert.ok(all.some((a) => a.name === "Hide"));
  assert.ok(all.some((a) => a.name === "Search"));
  assert.ok(all.some((a) => a.name === "Cast Ritual Spell"));
});

// --- explorationActions.findAll ---

test("findAll spell-caster: includes Cast Ritual Spell", () => {
  const result = explorationActions.findAll({ classification: "spell-caster" });
  assert.ok(result.some((a) => a.name === "Cast Ritual Spell"));
});

test("findAll versatile: includes Cast Ritual Spell", () => {
  const result = explorationActions.findAll({ classification: "versatile" });
  assert.ok(result.some((a) => a.name === "Cast Ritual Spell"));
});

test("findAll martial: excludes Cast Ritual Spell", () => {
  const result = explorationActions.findAll({ classification: "martial" });
  assert.ok(!result.some((a) => a.name === "Cast Ritual Spell"));
});

test("findAll martial: includes unrestricted actions like Search", () => {
  const result = explorationActions.findAll({ classification: "martial" });
  assert.ok(result.some((a) => a.name === "Search"));
});
