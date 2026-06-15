import assert from "node:assert/strict";
import { test } from "vitest";

import { DEFAULT_PROFICIENCIES, skills } from "./skills.model.ts";

// --- skills.get ---

test("get athletics returns correct definition", () => {
  const s = skills.get({ name: "athletics" });
  assert.equal(s.name, "athletics");
  assert.equal(s.ability, "str");
});

test("get perception returns correct definition", () => {
  const s = skills.get({ name: "perception" });
  assert.equal(s.name, "perception");
  assert.equal(s.ability, "wis");
});

test("get throws on unknown skill", () => {
  assert.throws(() => skills.get({ name: "lockpicking" as "athletics" }), /Unknown skill/);
});

// --- skills.find ---

test("find returns undefined for unknown skill", () => {
  assert.equal(skills.find({ name: "lockpicking" }), undefined);
});

test("find returns definition for known skill", () => {
  const s = skills.find({ name: "stealth" });
  assert.ok(s !== undefined);
  assert.equal(s.ability, "dex");
});

// --- skills.list ---

test("list returns exactly 18 skills", () => {
  assert.equal(skills.list().length, 18);
});

test("every skill has a name, label, and ability", () => {
  for (const s of skills.list()) {
    assert.ok(s.name, "missing name");
    assert.ok(s.label, `missing label on ${s.name}`);
    assert.ok(s.ability, `missing ability on ${s.name}`);
  }
});

// --- skills.findAll ---

test("findAll str skills: only athletics", () => {
  const strSkills = skills.findAll({ ability: "str" });
  assert.equal(strSkills.length, 1);
  assert.equal(strSkills[0].name, "athletics");
});

test("findAll wis skills: 5 entries including perception and insight", () => {
  const wisSkills = skills.findAll({ ability: "wis" });
  assert.equal(wisSkills.length, 5);
  assert.ok(wisSkills.some((s) => s.name === "perception"));
  assert.ok(wisSkills.some((s) => s.name === "insight"));
});

test("findAll cha skills: 4 entries including persuasion", () => {
  const chaSkills = skills.findAll({ ability: "cha" });
  assert.equal(chaSkills.length, 4);
  assert.ok(chaSkills.some((s) => s.name === "persuasion"));
});

// --- DEFAULT_PROFICIENCIES ---

test("DEFAULT_PROFICIENCIES contains insight and perception", () => {
  assert.ok(DEFAULT_PROFICIENCIES.includes("insight"));
  assert.ok(DEFAULT_PROFICIENCIES.includes("perception"));
});
