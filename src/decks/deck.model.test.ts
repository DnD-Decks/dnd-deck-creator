import assert from "node:assert/strict";
import { test } from "vitest";

import { decks } from "./deck.model.ts";

// --- wizard level-1 deck ---

test("wizard deck: 46 cards (1 resource + 3 feats + 19 cantrips + 23 level-1)", () => {
  const deck = decks.get({ cls: "wizard" });
  assert.equal(deck.cls.label, "Wizard");
  assert.equal(deck.cards.length, 46);
});

test("wizard deck has no level-2 spells", () => {
  const deck = decks.get({ cls: "wizard" });
  const level2 = deck.cards.filter((c) => c.kind === "spell" && c.spell.level === 2);
  assert.equal(level2.length, 0);
});

test("wizard deck section order: resource → feat → spell", () => {
  const deck = decks.get({ cls: "wizard" });
  const firstResource = deck.cards.findIndex((c) => c.kind === "resource");
  const firstFeat = deck.cards.findIndex((c) => c.kind === "feat");
  const firstSpell = deck.cards.findIndex((c) => c.kind === "spell");
  assert.ok(firstResource < firstFeat, "resources before feats");
  assert.ok(firstFeat < firstSpell, "feats before spells");
});

test("wizard deck has Arcane Recovery feat", () => {
  const deck = decks.get({ cls: "wizard" });
  const ids = deck.cards
    .filter((c) => c.kind === "feat")
    .map((c) => (c.kind === "feat" ? c.feat.id : ""));
  assert.ok(ids.includes("wizard-arcane-recovery"));
});

test("wizard deck includes fire-bolt and magic-missile", () => {
  const deck = decks.get({ cls: "wizard" });
  const ids = deck.cards
    .filter((c) => c.kind === "spell")
    .map((c) => (c.kind === "spell" ? c.spell.id : ""));
  assert.ok(ids.includes("fire-bolt"));
  assert.ok(ids.includes("magic-missile"));
});

test("wizard deck has no weapon-mastery cards", () => {
  const deck = decks.get({ cls: "wizard" });
  assert.equal(deck.cards.filter((c) => c.kind === "weapon-mastery").length, 0);
});

// --- fighter level-1 deck ---

test("fighter deck: 11 cards (1 resource + 2 feats + 8 masteries)", () => {
  const deck = decks.get({ cls: "fighter" });
  assert.equal(deck.cls.label, "Fighter");
  assert.equal(deck.cards.length, 11);
});

test("fighter deck has no spells", () => {
  const deck = decks.get({ cls: "fighter" });
  assert.equal(deck.cards.filter((c) => c.kind === "spell").length, 0);
});

test("fighter deck section order: resource → feat → mastery", () => {
  const deck = decks.get({ cls: "fighter" });
  const firstResource = deck.cards.findIndex((c) => c.kind === "resource");
  const firstFeat = deck.cards.findIndex((c) => c.kind === "feat");
  const firstMastery = deck.cards.findIndex((c) => c.kind === "weapon-mastery");
  assert.ok(firstResource < firstFeat, "resources before feats");
  assert.ok(firstFeat < firstMastery, "feats before masteries");
});

test("fighter deck has all 8 weapon mastery cards", () => {
  const deck = decks.get({ cls: "fighter" });
  const masteryIds = deck.cards
    .filter((c) => c.kind === "weapon-mastery")
    .map((c) => (c.kind === "weapon-mastery" ? c.mastery.id : ""));
  const EXPECTED = ["cleave", "graze", "nick", "push", "sap", "slow", "topple", "vex"];
  for (const id of EXPECTED) {
    assert.ok(masteryIds.includes(id), `missing mastery: ${id}`);
  }
});

test("fighter deck has Second Wind resource", () => {
  const deck = decks.get({ cls: "fighter" });
  const resourceIds = deck.cards
    .filter((c) => c.kind === "resource")
    .map((c) => (c.kind === "resource" ? c.resource.id : ""));
  assert.ok(resourceIds.includes("fighter-second-wind"));
});

// --- other caster classes: non-empty decks with spell cards ---

const CASTER_CLASSES = ["bard", "cleric", "druid", "sorcerer", "warlock"] as const;

for (const cls of CASTER_CLASSES) {
  test(`${cls} deck: non-empty and contains spell cards`, () => {
    const deck = decks.get({ cls });
    assert.ok(deck.cards.length > 0, `${cls} deck is empty`);
    assert.ok(
      deck.cards.some((card) => card.kind === "spell"),
      `${cls} deck has no spell cards`
    );
  });
}

// --- martial / empty classes ---

test("class without vendored cards returns an empty deck", () => {
  const deck = decks.get({ cls: "barbarian" });
  assert.equal(deck.cls.label, "Barbarian");
  assert.deepEqual(deck.cards, []);
});
