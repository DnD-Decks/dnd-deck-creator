import actionsData from "../../data/actions/actions.json" with { type: "json" };

import type { ManualClassification } from "src/models/class/classes.model";

export type ExplorationCategory = "exploration" | "social";

export type ExplorationAction = {
  name: string;
  category: ExplorationCategory;
  icon?: string;
  description: string;
  classificationRestriction?: ManualClassification[];
};

const DATA = actionsData.exploration as ExplorationAction[];
const BY_NAME = new Map(DATA.map((a) => [a.name, a]));

export const explorationActions = {
  get({ name }: { name: string }): ExplorationAction {
    const found = BY_NAME.get(name);
    if (!found) throw new Error(`Unknown exploration action: ${name}`);
    return found;
  },

  find({ name }: { name: string }): ExplorationAction | undefined {
    return BY_NAME.get(name);
  },

  list(): ExplorationAction[] {
    return DATA;
  },

  findAll({ classification }: { classification: ManualClassification }): ExplorationAction[] {
    return DATA.filter(
      (a) => !a.classificationRestriction || a.classificationRestriction.includes(classification)
    );
  },
};
