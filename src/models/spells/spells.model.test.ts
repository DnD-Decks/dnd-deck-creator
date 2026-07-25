import assert from "node:assert/strict";
import { test } from "vitest";

import cantripsData from "../../data/spells/spells-level-0.json" with { type: "json" };
import spellsLevel1Data from "../../data/spells/spells-level-1.json" with { type: "json" };
import spellsLevel2Data from "../../data/spells/spells-level-2.json" with { type: "json" };
import { spells } from "./spells.model.ts";

// --- data integrity: no duplicate spell ids across the three level files ---

test("no duplicate spell ids across level-0/1/2 files (BY_ID must not overwrite)", () => {
  const rawTotal =
    Object.keys(cantripsData).length +
    Object.keys(spellsLevel1Data).length +
    Object.keys(spellsLevel2Data).length;
  const uniqueIds = new Set(spells.list().map((s) => s.id));
  assert.equal(
    uniqueIds.size,
    rawTotal,
    "duplicate spell id across level files — BY_ID silently overwrites on collision"
  );
});

test("wizard lvl-2 spells: non-empty and all level 2", () => {
  const level2 = spells.findAll({ cls: "wizard", level: 2 });
  assert.ok(level2.length > 0);
  assert.ok(level2.every((s) => s.level === 2));
});

// --- all caster classes: cantrips + level1 non-empty and fully resolved ---

const CASTER_CLASSES = ["bard", "cleric", "druid", "sorcerer", "warlock", "wizard"] as const;

for (const cls of CASTER_CLASSES) {
  test(`${cls} cantrips: non-empty and every entry has id and name`, () => {
    const cantrips = spells.findAll({ cls, level: 0 });
    assert.ok(cantrips.length > 0, `${cls} has no cantrips`);
    for (const s of cantrips) {
      assert.ok(s.id, `${cls} cantrip missing id`);
      assert.ok(s.name, `${cls} cantrip ${s.id} missing name`);
    }
  });

  test(`${cls} level-1 spells: non-empty and every entry has id and name`, () => {
    const level1 = spells.findAll({ cls, level: 1 });
    assert.ok(level1.length > 0, `${cls} has no level-1 spells`);
    for (const s of level1) {
      assert.ok(s.id, `${cls} lvl-1 spell missing id`);
      assert.ok(s.name, `${cls} lvl-1 spell ${s.id} missing name`);
    }
  });
}

// --- half-casters and martial classes: empty results ---

test("paladin (half-caster, no cantrips in 2024 rules) returns empty for cantrips", () => {
  assert.deepEqual(spells.findAll({ cls: "paladin", level: 0 }), []);
});

test("paladin level-1 spells include Bless and Cure Wounds", () => {
  const ids = spells.findAll({ cls: "paladin", level: 1 }).map((s) => s.id);
  assert.ok(ids.includes("bless"));
  assert.ok(ids.includes("cure-wounds"));
});

test("ranger (half-caster, no cantrips in 2024 rules) returns empty for cantrips", () => {
  assert.deepEqual(spells.findAll({ cls: "ranger", level: 0 }), []);
});

test("ranger level-1 spells include Hunter's Mark and Cure Wounds", () => {
  const ids = spells.findAll({ cls: "ranger", level: 1 }).map((s) => s.id);
  assert.ok(ids.includes("hunters-mark"));
  assert.ok(ids.includes("cure-wounds"));
});

test("findAll for martial class returns empty array", () => {
  // cast to bypass TS — runtime guard must hold for classes absent from CLASS_DATA
  const result = spells.findAll({ cls: "fighter" as "wizard", level: 1 });
  assert.deepEqual(result, []);
});

test("findAll for level 3+ returns empty array", () => {
  const result = spells.findAll({ cls: "wizard", level: 3 });
  assert.deepEqual(result, []);
});

// --- spells.get / find ---

test("get unknown spell throws", () => {
  assert.throws(() => spells.get({ id: "not-a-spell" }), /Unknown spell/);
});

test("find unknown spell returns undefined", () => {
  assert.equal(spells.find({ id: "not-a-spell" }), undefined);
});
