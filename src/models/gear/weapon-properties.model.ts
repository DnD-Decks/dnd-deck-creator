import weaponPropertiesData from "../../data/gear/weapon-properties.json" with { type: "json" };

export type WeaponPropertyId =
  | "ammunition"
  | "finesse"
  | "heavy"
  | "light"
  | "loading"
  | "range"
  | "reach"
  | "thrown"
  | "two-handed"
  | "versatile";

export type WeaponProperty = {
  id: WeaponPropertyId;
  description: string;
};

// Raw JSON is a Record<WeaponPropertyId, descriptionString>; inject id from key.
const RAW = weaponPropertiesData as Record<WeaponPropertyId, string>;

const DATA: WeaponProperty[] = Object.entries(RAW).map(([id, description]) => ({
  id: id as WeaponPropertyId,
  description,
}));
const BY_ID = new Map<string, WeaponProperty>(DATA.map((p) => [p.id, p]));

export const weaponProperties = {
  get({ id }: { id: WeaponPropertyId }): WeaponProperty {
    const found = BY_ID.get(id);
    if (!found) throw new Error(`Unknown weapon property: ${id}`);
    return found;
  },

  find({ id }: { id: string }): WeaponProperty | undefined {
    return BY_ID.get(id);
  },

  list(): readonly WeaponProperty[] {
    return DATA;
  },
};
