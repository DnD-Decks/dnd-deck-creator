import assert from "node:assert/strict";
import { test } from "vitest";

import { skills } from "./skills.model.ts";

// --- skills.get ---

test("get throws on unknown skill", () => {
  assert.throws(() => skills.get({ name: "lockpicking" as "athletics" }), /Unknown skill/);
});

// --- skills.find ---

test("find returns undefined for unknown skill", () => {
  assert.equal(skills.find({ name: "lockpicking" }), undefined);
});

// --- skills.list ---

test("list returns exactly 18 skills", () => {
  assert.equal(skills.list().length, 18);
});

// --- skills.findAll ---

test("findAll str skills: only athletics", () => {
  const strSkills = skills.findAll({ ability: "str" });
  assert.equal(strSkills.length, 1);
  assert.equal(strSkills[0].name, "athletics");
});
