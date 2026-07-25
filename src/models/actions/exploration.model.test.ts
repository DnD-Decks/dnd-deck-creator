import assert from "node:assert/strict";
import { test } from "vitest";

import { explorationActions } from "./exploration.model.ts";

// --- explorationActions.get ---

test("get throws on unknown exploration action", () => {
  assert.throws(() => explorationActions.get({ name: "Fly" }), /Unknown exploration action/);
});

// --- explorationActions.find ---

test("find returns undefined for unknown action", () => {
  assert.equal(explorationActions.find({ name: "Fly" }), undefined);
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
