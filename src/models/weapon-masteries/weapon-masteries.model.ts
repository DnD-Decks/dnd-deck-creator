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

// D&D 2024: only Fighter has Weapon Mastery at level 1
const MASTERY_CLASSES = new Set<CharacterClass>(["fighter"]);

export const weaponMasteries = {
  list(): WeaponMastery[] {
    return ALL;
  },

  findAll({ cls }: { cls: CharacterClass }): WeaponMastery[] {
    return MASTERY_CLASSES.has(cls) ? ALL : [];
  },
};
