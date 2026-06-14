// Runtime imports are relative with .ts extension so node:test can resolve them
// (the src/* alias only exists for tsc and vite).
import { classes } from "../models/class/classes.model.ts";
import { feats } from "../models/feats/feats.model.ts";
import { resources } from "../models/resources/resources.model.ts";
import { spells } from "../models/spells/spells.model.ts";
import { weaponMasteries } from "../models/weapon-masteries/weapon-masteries.model.ts";

import type { CharacterClass, ClassDetails } from "src/models/class/classes.model";
import type { Feat } from "src/models/feats/feats.model";
import type { Resource } from "src/models/resources/resources.model";
import type { Spell, SpellLevel } from "src/models/spells/spells.model";
import type { WeaponMastery } from "src/models/weapon-masteries/weapon-masteries.model";

export type DeckCard =
  | { kind: "spell"; spell: Spell }
  | { kind: "resource"; resource: Resource }
  | { kind: "feat"; feat: Feat }
  | { kind: "weapon-mastery"; mastery: WeaponMastery };

export type Deck = { cls: ClassDetails; cards: DeckCard[] };

const SPELL_LEVELS: SpellLevel[] = [0, 1];

// Decks are pure over static JSON, so each class is assembled at most once.
const CACHE = new Map<CharacterClass, Deck>();

export const decks = {
  get({ cls }: { cls: CharacterClass }): Deck {
    const cached = CACHE.get(cls);
    if (cached) return cached;

    const resourceCards: DeckCard[] = resources
      .findAll({ cls })
      .map((resource): DeckCard => ({ kind: "resource", resource }));

    const featCards: DeckCard[] = feats
      .findAll({ cls })
      .map((feat): DeckCard => ({ kind: "feat", feat }));

    const spellCards: DeckCard[] = SPELL_LEVELS.flatMap((level) =>
      spells.findAll({ cls, level }).map((spell): DeckCard => ({ kind: "spell", spell }))
    );

    const masteryCards: DeckCard[] = weaponMasteries
      .findAll({ cls })
      .map((mastery): DeckCard => ({ kind: "weapon-mastery", mastery }));

    const deck: Deck = {
      cls: classes.get({ id: cls }),
      cards: [...resourceCards, ...featCards, ...spellCards, ...masteryCards],
    };
    CACHE.set(cls, deck);
    return deck;
  },
};
