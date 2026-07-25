import assert from "node:assert/strict";
import { test } from "vitest";

import { classes } from "src/models/class/classes.model.ts";
import { feats } from "./feats.model.ts";

test("every class has at least one feat, with unique prefixed ids and descriptions", () => {
  const seen = new Set<string>();
  for (const cls of classes.list()) {
    const result = feats.findAll({ cls: cls.id });
    assert.ok(result.length >= 1, `${cls.id} has no feats`);
    for (const f of result) {
      assert.ok(!seen.has(f.id), `duplicate feat id across classes: ${f.id}`);
      seen.add(f.id);
      assert.ok(f.id.startsWith(`${cls.id}-`), `feat id ${f.id} not prefixed with ${cls.id}-`);
      assert.ok(f.description.length > 0, `feat ${f.id} has an empty description`);
    }
  }
});

test("findAll for a class absent from CLASS_DATA returns empty array", () => {
  // cast to bypass TS — every real class has feats now, but the runtime guard must hold
  assert.deepEqual(feats.findAll({ cls: "artificer" as "wizard" }), []);
});
