import fighterResourcesData from "../../data/resources/fighter-resources.json" with {
  type: "json",
};
import wizardResourcesData from "../../data/resources/wizard-resources.json" with { type: "json" };

import type { ActionTiming } from "src/models/actions/combat.model";
import type { CharacterClass } from "src/models/class/classes.model";
import type { RestType } from "src/models/rest/rest-actions.model";

export type Resource = {
  id: string;
  name: string;
  uses: number;
  recharge: RestType;
  action?: ActionTiming;
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
