import barbarianFeatsData from "../../data/feats/barbarian-feats.json" with { type: "json" };
import fighterFeatsData from "../../data/feats/fighter-feats.json" with { type: "json" };
import wizardFeatsData from "../../data/feats/wizard-feats.json" with { type: "json" };

import type { CharacterClass } from "src/models/class/classes.model";

export type Feat = {
  id: string;
  name: string;
  source: string;
  description: string;
  icon?: string;
};

const CLASS_DATA: Partial<Record<CharacterClass, Feat[]>> = {
  barbarian: barbarianFeatsData as Feat[],
  wizard: wizardFeatsData as Feat[],
  fighter: fighterFeatsData as Feat[],
};

export const feats = {
  findAll({ cls }: { cls: CharacterClass }): Feat[] {
    return CLASS_DATA[cls] ?? [];
  },
};
