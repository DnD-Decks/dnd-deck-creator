import barbarianResourcesData from "../../data/resources/barbarian-resources.json" with {
  type: "json",
};
import bardResourcesData from "../../data/resources/bard-resources.json" with { type: "json" };
import clericResourcesData from "../../data/resources/cleric-resources.json" with { type: "json" };
import druidResourcesData from "../../data/resources/druid-resources.json" with { type: "json" };
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
  barbarian: barbarianResourcesData as Resource[],
  bard: bardResourcesData as Resource[],
  cleric: clericResourcesData as Resource[],
  druid: druidResourcesData as Resource[],
  wizard: wizardResourcesData as Resource[],
  fighter: fighterResourcesData as Resource[],
};

export const resources = {
  findAll({ cls }: { cls: CharacterClass }): Resource[] {
    return CLASS_DATA[cls] ?? [];
  },
};
