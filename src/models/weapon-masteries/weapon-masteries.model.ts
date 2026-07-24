import masteriesData from "../../data/weapon-masteries/weapon-masteries.json" with { type: "json" };

import type { CharacterClass } from "src/models/class/classes.model";

export type WeaponMastery = {
  id: string;
  name: string;
  description: string;
  icon?: string;
};

const ALL: WeaponMastery[] = masteriesData as WeaponMastery[];

// D&D 2024: classes with the level-1 Weapon Mastery feature get the property
// reference cards in their deck.
const MASTERY_CLASSES = new Set<CharacterClass>([
  "barbarian",
  "fighter",
  "paladin",
  "ranger",
  "rogue",
]);

export const weaponMasteries = {
  list(): WeaponMastery[] {
    return ALL;
  },

  findAll({ cls }: { cls: CharacterClass }): WeaponMastery[] {
    return MASTERY_CLASSES.has(cls) ? ALL : [];
  },
};
