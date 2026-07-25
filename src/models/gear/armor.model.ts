import armorData from "../../data/gear/armor.json" with { type: "json" };

export type ArmorCategory = "light" | "medium" | "heavy" | "shield";

export type ArmorId =
  | "padded-armor"
  | "leather-armor"
  | "studded-leather-armor"
  | "hide-armor"
  | "chain-shirt"
  | "scale-mail"
  | "breastplate"
  | "half-plate-armor"
  | "ring-mail"
  | "chain-mail"
  | "splint-armor"
  | "plate-armor"
  | "shield";

type ArmorDexBonusCap =
  | { dexModifier: false; maxDexModifier: null }
  | { dexModifier: true; maxDexModifier: number | null };

export type Armor = {
  id: ArmorId;
  name: string;
  category: ArmorCategory;
  baseAc: number;
  requiredStr: number | null;
  stealthDisadvantage: boolean;
} & ArmorDexBonusCap;

const DATA = armorData as Armor[];
const BY_ID = new Map<string, Armor>(DATA.map((a) => [a.id, a]));

export const armor = {
  get({ id }: { id: ArmorId }): Armor {
    const found = BY_ID.get(id);
    if (!found) throw new Error(`Unknown armor: ${id}`);
    return found;
  },

  find({ id }: { id: string }): Armor | undefined {
    return BY_ID.get(id);
  },

  list(): readonly Armor[] {
    return DATA;
  },
};
