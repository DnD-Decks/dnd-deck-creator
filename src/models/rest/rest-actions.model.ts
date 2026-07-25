import restActionsData from "../../data/rest/rest-actions.json" with { type: "json" };

export type RestType = "short-rest" | "long-rest";

export type RestAction = {
  id: RestType;
  label: string;
  description: string;
};

const DATA = restActionsData as RestAction[];
const BY_ID = new Map<string, RestAction>(DATA.map((a) => [a.id, a]));

export const restActions = {
  get({ id }: { id: RestType }): RestAction {
    const found = BY_ID.get(id);
    if (!found) throw new Error(`Unknown rest action: ${id}`);
    return found;
  },

  find({ id }: { id: string }): RestAction | undefined {
    return BY_ID.get(id);
  },

  list(): readonly RestAction[] {
    return DATA;
  },
};
