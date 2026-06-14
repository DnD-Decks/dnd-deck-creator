// Runtime imports are relative with .ts extension so node:test can resolve them
import fighterResourcesData from "../../data/resources/fighter-resources.json" with {
  type: "json",
};
import wizardResourcesData from "../../data/resources/wizard-resources.json" with { type: "json" };

import type { CharacterClass } from "src/models/class/classes.model";

export type Resource = {
  id: string;
  name: string;
  uses: number;
  recharge: "Short Rest" | "Long Rest";
  action?: "Action" | "Bonus Action" | "Reaction";
  description: string;
  icon?: string;
};

const CLASS_DATA: Partial<Record<CharacterClass, Resource[]>> = {
  wizard: wizardResourcesData as Resource[],
  fighter: fighterResourcesData as Resource[],
};

export const resources = {
  findAll({ cls }: { cls: CharacterClass }): Resource[] {
    return CLASS_DATA[cls] ?? [];
  },
};
