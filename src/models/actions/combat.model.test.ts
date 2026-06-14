import assert from "node:assert/strict";
import { test } from "node:test";

import { combatActions } from "./combat.model.ts";

// --- combatActions.get ---

test("get Attack returns timing: action", () => {
  const a = combatActions.get({ name: "Attack" });
  assert.equal(a.name, "Attack");
  assert.equal(a.timing, "action");
});

test("get Opportunity Attack returns timing: reaction", () => {
  const a = combatActions.get({ name: "Opportunity Attack" });
  assert.equal(a.timing, "reaction");
});

test("get throws on unknown action", () => {
  assert.throws(() => combatActions.get({ name: "Teleport" }), /Unknown combat action/);
});

// --- combatActions.find ---

test("find Dodge returns details", () => {
  const a = combatActions.find({ name: "Dodge" });
  assert.ok(a !== undefined);
  assert.equal(a.timing, "action");
});

test("find returns undefined for unknown action", () => {
  assert.equal(combatActions.find({ name: "Teleport" }), undefined);
});

// --- combatActions.list ---

test("list contains Attack and Opportunity Attack", () => {
  const all = combatActions.list();
  assert.ok(all.some((a) => a.name === "Attack"));
  assert.ok(all.some((a) => a.name === "Opportunity Attack"));
});

test("every combat action has name, timing, and description", () => {
  for (const a of combatActions.list()) {
    assert.ok(a.name, "missing name");
    assert.ok(a.timing, `missing timing on ${a.name}`);
    assert.ok(a.description, `missing description on ${a.name}`);
  }
});
