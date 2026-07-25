import assert from "node:assert/strict";
import { test } from "vitest";

import { classes } from "src/models/class/classes.model.ts";
import { resources } from "./resources.model.ts";

test("warlock mana is the Pact Magic slot: 1 use, short-rest recharge", () => {
  const [mana] = resources.findAll({ cls: "warlock" });
  assert.equal(mana.id, "warlock-mana");
  assert.equal(mana.uses, 1);
  assert.equal(mana.recharge, "short-rest");
});

test("class without resources returns empty array", () => {
  assert.deepEqual(resources.findAll({ cls: "rogue" }), []);
});

test("across all classes: resource ids unique, uses ≥ 1, valid recharge", () => {
  const VALID_RECHARGES = ["short-rest", "long-rest"];
  const seen = new Set<string>();
  for (const cls of classes.list()) {
    for (const r of resources.findAll({ cls: cls.id })) {
      assert.ok(!seen.has(r.id), `duplicate resource id across classes: ${r.id}`);
      seen.add(r.id);
      assert.ok(r.uses >= 1, `resource ${r.id} has uses < 1: ${r.uses}`);
      assert.ok(VALID_RECHARGES.includes(r.recharge), `bad recharge on ${r.id}: ${r.recharge}`);
    }
  }
});
