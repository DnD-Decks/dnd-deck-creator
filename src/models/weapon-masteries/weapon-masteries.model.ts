// Runtime imports are relative with .ts extension so node:test can resolve them
import masteriesData from "../../data/weapon-masteries/weapon-masteries.json" with { type: "json" };

import type { CharacterClass } from "src/models/class/classes.model";

export type WeaponMastery = {
  id: string;
  name: string;
  description: string;
  icon?: string;
};

const ALL: WeaponMastery[] = masteriesData as WeaponMastery[];

// Fighter gets all 8 mastery properties at level 1.
// Other classes have no mastery cards.
const MASTERY_CLASSES = new Set<CharacterClass>(["fighter"]);

export const weaponMasteries = {
  list(): WeaponMastery[] {
    return ALL;
  },

  findAll({ cls }: { cls: CharacterClass }): WeaponMastery[] {
    return MASTERY_CLASSES.has(cls) ? ALL : [];
  },
};
