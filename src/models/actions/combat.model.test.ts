import assert from "node:assert/strict";
import { test } from "vitest";

import { combatActions } from "./combat.model.ts";

// --- combatActions.get ---

test("get throws on unknown action", () => {
  assert.throws(() => combatActions.get({ name: "Teleport" }), /Unknown combat action/);
});

// --- combatActions.find ---

test("find returns undefined for unknown action", () => {
  assert.equal(combatActions.find({ name: "Teleport" }), undefined);
});
