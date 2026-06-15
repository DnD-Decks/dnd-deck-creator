import assert from "node:assert/strict";
import { test } from "vitest";

import { restActions } from "./rest-actions.model.ts";

// --- restActions.get ---

test("get short-rest returns correct label", () => {
  assert.equal(restActions.get({ id: "short-rest" }).label, "Short Rest");
});

test("get long-rest returns correct label", () => {
  assert.equal(restActions.get({ id: "long-rest" }).label, "Long Rest");
});

test("get throws on unknown rest type", () => {
  assert.throws(() => restActions.get({ id: "nap" as "short-rest" }), /Unknown rest action/);
});

// --- restActions.find ---

test("find returns details for known rest action", () => {
  const a = restActions.find({ id: "short-rest" });
  assert.ok(a !== undefined);
  assert.equal(a.label, "Short Rest");
});

test("find returns undefined for unknown rest action", () => {
  assert.equal(restActions.find({ id: "nap" }), undefined);
});

// --- restActions.list ---

test("list has at least 2 rest actions", () => {
  assert.ok(restActions.list().length >= 2);
});

test("every rest action has id, label, and description", () => {
  for (const a of restActions.list()) {
    assert.ok(a.id, "missing id");
    assert.ok(a.label, `missing label on ${a.id}`);
    assert.ok(a.description, `missing description on ${a.id}`);
  }
});
