import proficiencyData from "../../data/proficiencies/proficiency-details.json" with {
  type: "json",
};

import type { ProficiencyKey } from "src/models/class/classes.model";

export type ProficiencyDetails = {
  id: ProficiencyKey;
  label: string;
};

// Raw JSON is a superset (includes icon); inject id from key.
type RawProficiency = Omit<ProficiencyDetails, "id">;
const RAW = proficiencyData as Record<ProficiencyKey, RawProficiency>;

const DATA: ProficiencyDetails[] = (Object.keys(RAW) as ProficiencyKey[]).map((id) => ({
  id,
  ...RAW[id],
}));
const BY_ID = new Map<string, ProficiencyDetails>(DATA.map((p) => [p.id, p]));

export const proficiencyDetails = {
  get({ id }: { id: ProficiencyKey }): ProficiencyDetails {
    const found = BY_ID.get(id);
    if (!found) throw new Error(`Unknown proficiency: ${id}`);
    return found;
  },

  find({ id }: { id: string }): ProficiencyDetails | undefined {
    return BY_ID.get(id);
  },

  list(): readonly ProficiencyDetails[] {
    return DATA;
  },
};
