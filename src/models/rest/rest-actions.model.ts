import restActionsData from "../../data/rest/rest-actions.json" with { type: "json" };

export type RestType = "short-rest" | "long-rest";

export type RestAction = {
  id: RestType;
  label: string;
  icon: string;
  description: string;
};

const DATA = restActionsData as RestAction[];

export const restActions = {
  get({ id }: { id: RestType }): RestAction {
    const found = DATA.find((a) => a.id === id);
    if (!found) throw new Error(`Unknown rest action: ${id}`);
    return found;
  },

  find({ id }: { id: string }): RestAction | undefined {
    return DATA.find((a) => a.id === id);
  },

  list(): RestAction[] {
    return DATA;
  },
};
