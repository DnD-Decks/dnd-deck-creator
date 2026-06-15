import assert from "node:assert/strict";
import { test } from "vitest";

import {
  classResources,
  resolveResourceResetOn,
  resolveResourcesForLevel,
} from "./class-resources.model.ts";

import type { AbilityScores } from "../abilities/abilities.model.ts";

// Standard array scores for most tests.
const DEFAULT_SCORES: AbilityScores = {
  str: 15,
  dex: 14,
  con: 13,
  int: 12,
  wis: 10,
  cha: 8,
};

// --- classResources.get ---

test("get rage returns correct definition", () => {
  const r = classResources.get({ id: "rage" });
  assert.equal(r.id, "rage");
  assert.equal(r.name, "Rage");
});

test("get throws on unknown resource", () => {
  assert.throws(() => classResources.get({ id: "time-stop" }), /Unknown resource/);
});

// --- classResources.find ---

test("find returns undefined for unknown resource", () => {
  assert.equal(classResources.find({ id: "time-stop" }), undefined);
});

test("find spell-slot-1st returns definition", () => {
  const r = classResources.find({ id: "spell-slot-1st" });
  assert.ok(r !== undefined);
  assert.equal(r.id, "spell-slot-1st");
});

// --- classResources.list ---

test("list is non-empty", () => {
  assert.ok(classResources.list().length > 0);
});

test("list deduplicates shared resources (spell-slot-1st appears once)", () => {
  const all = classResources.list();
  const slotEntries = all.filter((r) => r.id === "spell-slot-1st");
  assert.equal(slotEntries.length, 1);
});

// --- resolveResourceResetOn ---

test("barbarian rage resets on long-rest", () => {
  assert.equal(resolveResourceResetOn("barbarian", "rage"), "long-rest");
});

test("fighter second-wind resets on short-rest", () => {
  assert.equal(resolveResourceResetOn("fighter", "second-wind"), "short-rest");
});

test("warlock pact-magic-slot resets on short-rest", () => {
  assert.equal(resolveResourceResetOn("warlock", "pact-magic-slot"), "short-rest");
});

test("resolveResourceResetOn throws for unknown resource on a class", () => {
  assert.throws(() => resolveResourceResetOn("barbarian", "pact-magic-slot"), /Unknown resource/);
});

// --- resolveResourcesForLevel ---

test("barbarian at L1 has 2 rage uses", () => {
  const resources = resolveResourcesForLevel("barbarian", 1, DEFAULT_SCORES);
  const rage = resources.find((r) => r.resourceId === "rage");
  assert.ok(rage !== undefined);
  assert.equal(rage.max, 2);
  assert.equal(rage.current, 2);
});

test("barbarian at L3 has 3 rage uses", () => {
  const resources = resolveResourcesForLevel("barbarian", 3, DEFAULT_SCORES);
  const rage = resources.find((r) => r.resourceId === "rage");
  assert.ok(rage !== undefined);
  assert.equal(rage.max, 3);
});

test("bard bardic-inspiration uses cha modifier (min 1)", () => {
  // cha=16 → modifier=3
  const highCha: AbilityScores = { ...DEFAULT_SCORES, cha: 16 };
  const resources = resolveResourcesForLevel("bard", 1, highCha);
  const inspiration = resources.find((r) => r.resourceId === "bardic-inspiration");
  assert.ok(inspiration !== undefined);
  assert.equal(inspiration.max, 3);
});

test("bard bardic-inspiration with low cha is floored at 1", () => {
  // cha=8 → modifier=-1 → resolveMax returns max(1, -1) = 1
  const resources = resolveResourcesForLevel("bard", 1, DEFAULT_SCORES);
  const inspiration = resources.find((r) => r.resourceId === "bardic-inspiration");
  assert.ok(inspiration !== undefined);
  assert.equal(inspiration.max, 1);
});

test("monk at L1 has no resources (discipline-points = 0)", () => {
  const resources = resolveResourcesForLevel("monk", 1, DEFAULT_SCORES);
  assert.equal(resources.length, 0);
});

test("monk at L2 has 2 discipline points", () => {
  const resources = resolveResourcesForLevel("monk", 2, DEFAULT_SCORES);
  const dp = resources.find((r) => r.resourceId === "discipline-points");
  assert.ok(dp !== undefined);
  assert.equal(dp.max, 2);
});

test("rogue has no resources at any level", () => {
  assert.equal(resolveResourcesForLevel("rogue", 1, DEFAULT_SCORES).length, 0);
  assert.equal(resolveResourcesForLevel("rogue", 5, DEFAULT_SCORES).length, 0);
});

test("wizard at L1 has arcane-recovery (1) and spell-slot-1st (2)", () => {
  const resources = resolveResourcesForLevel("wizard", 1, DEFAULT_SCORES);
  const ar = resources.find((r) => r.resourceId === "arcane-recovery");
  const ss = resources.find((r) => r.resourceId === "spell-slot-1st");
  assert.ok(ar !== undefined);
  assert.equal(ar.max, 1);
  assert.ok(ss !== undefined);
  assert.equal(ss.max, 2);
});

test("paladin spell-slot-1st is 0 at L1 (not yet available)", () => {
  const resources = resolveResourcesForLevel("paladin", 1, DEFAULT_SCORES);
  // lay-on-hands at L1 = 5, channel-divinity at L1 = 0 (filtered), spell slots = 0 (filtered)
  const ss = resources.find((r) => r.resourceId === "spell-slot-1st");
  assert.equal(ss, undefined);
  const loh = resources.find((r) => r.resourceId === "lay-on-hands");
  assert.ok(loh !== undefined);
  assert.equal(loh.max, 5);
});

test("resolveResourcesForLevel throws for invalid level (0)", () => {
  assert.throws(
    () => resolveResourcesForLevel("barbarian", 0, DEFAULT_SCORES),
    /level must be an integer 1–5/
  );
});

test("resolveResourcesForLevel throws for unknown class", () => {
  assert.throws(
    () => resolveResourcesForLevel("artificer" as "barbarian", 1, DEFAULT_SCORES),
    /no data for class/
  );
});

test("resolveResourceResetOn throws for unknown class", () => {
  assert.throws(() => resolveResourceResetOn("artificer" as "barbarian", "rage"), /unknown class/);
});

test("bard bardic-inspiration with neutral cha (score 10) is floored at 1", () => {
  // cha=10 → modifier=0 → resolveMax returns max(1, 0) = 1
  const neutralCha: AbilityScores = { ...DEFAULT_SCORES, cha: 10 };
  const resources = resolveResourcesForLevel("bard", 1, neutralCha);
  const inspiration = resources.find((r) => r.resourceId === "bardic-inspiration");
  assert.ok(inspiration !== undefined);
  assert.equal(inspiration.max, 1);
});
