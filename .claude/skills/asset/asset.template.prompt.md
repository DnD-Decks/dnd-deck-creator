<!--
Template for the /asset skill — image-generation prompt for a spell card's art box.
Placeholders (filled from src/data/spells/spells-level-*.json):

  {{name}}         spell name, e.g. "Fire Bolt"
  {{school}}       spell school, e.g. "Evocation"
  {{level_label}}  "cantrip" when level is 0, otherwise "level N spell"
  {{description}}  first 1–2 sentences of the spell description
  {{damage_note}}  optional whole line — "The visual centers on <type> damage."
                   Omit the line entirely when the spell has no damage field.

The style block is intentionally minimal — refine after reviewing the first real generations.
-->

Create a bold ink illustration for the D&D spell **{{name}}**, a {{school}} {{level_label}}.

Depict the spell in action: {{description}}
{{damage_note}}

Style: vintage newspaper engraving. Thick, hard black linework throughout — every contour and shadow drawn with heavy, confident strokes. Shading via crosshatching and halftone dots, never smooth gradients. Paper is off-white newsprint, not pure white. Limited, muted ink palette.

Composition: an **oval vignette** — the artwork lives inside an oval frame shape, edges dissolving into plain paper at the oval boundary; the corners stay empty newsprint. Must read clearly at small size — it prints inside a ~6 cm art box on a card.

Do NOT include: any text or lettering, rectangular borders, watermarks, signatures, UI elements, photorealism, smooth digital gradients, modern objects.

Output: 1:1 aspect ratio image file, at least 512 × 512 px (the oval composition sits inside the square canvas).
