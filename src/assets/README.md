# Asset Manifest

`asset-manifest.json` is the canonical list of every unique art asset this project needs.
It is the prerequisite for the `/asset` skill batch mode (issue #15) and the asset-pipeline
epic (#19).

## Coverage

| Scope | Count | Status |
|-------|-------|--------|
| Spell-card art, levels 0–2 | 122 | ✅ covered |
| Spell-card art, levels 3–9 | — | ⚠️ no data yet |
| Feat art | — | 🔜 deferred |
| Weapon-mastery art | — | 🔜 deferred |
| Resource art | — | 🔜 deferred |

## Known gaps

- **Spell levels 3–9**: no `src/data/spells/spells-level-{3..9}.json` files exist yet.
  When they land, re-generate the manifest (see below) and update the coverage table.
- **`paladin-spells.json` + `ranger-spells.json`**: empty stubs (`cantrips: [], level1: []`).
  No paladin/ranger spells appear in the manifest today. This is correct and expected.
- **Feat / weapon-mastery / resource art**: only spell-card art box is wired today.
  Extend the manifest when those card types get art boxes.

## Entry shape

```json
{ "id": "fire-bolt", "type": "spell", "name": "Fire Bolt", "school": "evocation", "level": 0 }
```

- `id` — kebab-case spell id, 1:1 with `public/art/<id>.png` (the target asset path)
- `type` — always `"spell"` today; extend when feat/weapon-mastery assets land
- `school` — lowercase (e.g. `"evocation"`, `"abjuration"`)
- `level` — `0` (cantrip) through `2` today

## Re-generating

When new spell-level data lands, regenerate with:

```js
// run once with: node generate-manifest.js  (then discard the script)
const fs = require("fs"), path = require("path");
const DATA = path.join(__dirname, "../data/spells");
const files = ["spells-level-0.json","spells-level-1.json","spells-level-2.json"
               /* add spells-level-3.json etc. here */];
const entries = [], seen = new Set();
for (const f of files) {
  for (const spell of Object.values(JSON.parse(fs.readFileSync(path.join(DATA,f),"utf8")))) {
    if (seen.has(spell.id)) continue;
    seen.add(spell.id);
    entries.push({ id:spell.id, type:"spell", name:spell.name,
                   school:spell.school.toLowerCase(), level:spell.level });
  }
}
entries.sort((a,b)=>a.level-b.level||a.id.localeCompare(b.id));
fs.writeFileSync(path.join(__dirname,"asset-manifest.json"), JSON.stringify(entries,null,2)+"\n");
console.log(entries.length,"entries");
```
