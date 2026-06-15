import abilitiesData from "../../data/abilities/abilities.json" with { type: "json" };

export type AbilityName = "str" | "dex" | "con" | "int" | "wis" | "cha";
export type AbilityScores = Record<AbilityName, number>;

export type AbilityDetails = {
  id: AbilityName;
  label: string;
  short: string;
};

export function computeModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

const DATA = abilitiesData as AbilityDetails[];
const BY_ID = new Map(DATA.map((a) => [a.id, a]));

export const abilities = {
  get({ id }: { id: AbilityName }): AbilityDetails {
    const found = BY_ID.get(id);
    if (!found) throw new Error(`Unknown ability: ${id}`);
    return found;
  },

  list(): AbilityDetails[] {
    return DATA;
  },
};
