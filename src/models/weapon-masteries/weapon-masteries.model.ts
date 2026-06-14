import masteriesData from "../../data/weapon-masteries/weapon-masteries.json" with { type: "json" };

import type { CharacterClass } from "src/models/class/classes.model";

export type WeaponMastery = {
  id: string;
  name: string;
  description: string;
  icon?: string;
};

const ALL: WeaponMastery[] = masteriesData as WeaponMastery[];

// D&D 2024: Weapon Mastery is exclusive to Fighter; other classes do not gain it.
const MASTERY_CLASSES = new Set<CharacterClass>(["fighter"]);

export const weaponMasteries = {
  list(): WeaponMastery[] {
    return ALL;
  },

  findAll({ cls }: { cls: CharacterClass }): WeaponMastery[] {
    return MASTERY_CLASSES.has(cls) ? ALL : [];
  },
};
