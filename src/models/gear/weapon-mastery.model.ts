import weaponMasteryData from "../../data/gear/weapon-mastery.json" with { type: "json" };

export type WeaponMasteryName =
  | "cleave"
  | "graze"
  | "nick"
  | "push"
  | "sap"
  | "slow"
  | "topple"
  | "vex";

export type WeaponMasteryDetails = {
  id: WeaponMasteryName;
  description: string;
};

// Raw JSON is a Record<WeaponMasteryName, descriptionString>; inject id from key.
const RAW = weaponMasteryData as Record<WeaponMasteryName, string>;

const DATA: WeaponMasteryDetails[] = (Object.keys(RAW) as WeaponMasteryName[]).map((id) => ({
  id,
  description: RAW[id],
}));
const BY_ID = new Map(DATA.map((m) => [m.id, m]));

export const weaponMastery = {
  get({ id }: { id: WeaponMasteryName }): WeaponMasteryDetails {
    const found = BY_ID.get(id);
    if (!found) throw new Error(`Unknown weapon mastery: ${id}`);
    return found;
  },

  find({ id }: { id: string }): WeaponMasteryDetails | undefined {
    return BY_ID.get(id as WeaponMasteryName);
  },

  list(): WeaponMasteryDetails[] {
    return DATA;
  },
};
