import assert from "node:assert/strict";
import { test } from "vitest";

import { proficiencyDetails } from "./proficiency-details.model.ts";

// --- proficiencyDetails.get ---

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
