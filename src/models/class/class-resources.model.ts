import classResourcesData from "../../data/classes/class-resources.json" with { type: "json" };

// Runtime import: relative .ts path so node:test can resolve without the src/* alias.
import { computeModifier } from "../abilities/abilities.model.ts";

import type { AbilityName, AbilityScores } from "src/models/abilities/abilities.model";
import type { CharacterClass } from "src/models/class/classes.model";
import type { RestType } from "src/models/rest/rest-actions.model";

export type ResourceId = string;

export type AbilityModKey = "str-mod" | "dex-mod" | "con-mod" | "int-mod" | "wis-mod" | "cha-mod";

export type ProgressionValue = number | AbilityModKey;

export type ResourceDefinition = {
  id: ResourceId;
  name: string;
  description: string;
};

export type CharacterResource = {
  resourceId: ResourceId;
  current: number;
  max: number;
};

type RawResourceEntry = {
  id: ResourceId;
  name: string;
  description: string;
  resetOn: RestType;
  progression: Record<string, ProgressionValue>;
};

type RawClassEntry = { resources: RawResourceEntry[] };

const RAW = classResourcesData as Record<CharacterClass, RawClassEntry>;

// Deduplicate resource definitions across classes (e.g. spell-slot-1st appears in many classes).
const ALL_DEFS: ResourceDefinition[] = [];
const BY_RESOURCE_ID = new Map<ResourceId, ResourceDefinition>();

for (const [className, classEntry] of Object.entries(RAW)) {
  if (!Array.isArray(classEntry.resources)) {
    throw new Error(`class-resources.json: missing "resources" array for class "${className}"`);
  }
  for (const r of classEntry.resources) {
    if (!r.id)
      throw new Error(`class-resources.json: resource entry missing "id" in class "${className}"`);
    if (!BY_RESOURCE_ID.has(r.id)) {
      const def: ResourceDefinition = {
        id: r.id,
        name: r.name,
        description: r.description,
      };
      ALL_DEFS.push(def);
      BY_RESOURCE_ID.set(r.id, def);
    }
  }
}

const ABILITY_MOD_MAP: Record<AbilityModKey, AbilityName> = {
  "str-mod": "str",
  "dex-mod": "dex",
  "con-mod": "con",
  "int-mod": "int",
  "wis-mod": "wis",
  "cha-mod": "cha",
};

function resolveMax(value: ProgressionValue, scores: AbilityScores): number {
  if (typeof value === "number") return value;
  return Math.max(1, computeModifier(scores[ABILITY_MOD_MAP[value]]));
}

export function resolveResourcesForLevel(
  characterClass: CharacterClass,
  level: number,
  abilityScores: AbilityScores
): CharacterResource[] {
  if (!Number.isInteger(level) || level < 1 || level > 5) {
    throw new Error(`resolveResourcesForLevel: level must be an integer 1–5, got ${level}`);
  }
  const entry = RAW[characterClass];
  if (!entry) throw new Error(`resolveResourcesForLevel: no data for class "${characterClass}"`);
  return entry.resources.flatMap((r) => {
    const rawValue = r.progression[String(level)] ?? 0;
    const max = resolveMax(rawValue, abilityScores);
    if (max <= 0) return [];
    return [{ resourceId: r.id, current: max, max }];
  });
}

export function resolveResourceResetOn(
  characterClass: CharacterClass,
  resourceId: ResourceId
): RestType {
  const entry = RAW[characterClass];
  if (!entry) throw new Error(`resolveResourceResetOn: unknown class "${characterClass}"`);
  const resource = entry.resources.find((r) => r.id === resourceId);
  if (!resource) throw new Error(`Unknown resource "${resourceId}" for class "${characterClass}"`);
  return resource.resetOn;
}

export const classResources = {
  get({ id }: { id: ResourceId }): ResourceDefinition {
    const found = BY_RESOURCE_ID.get(id);
    if (!found) throw new Error(`Unknown resource: ${id}`);
    return found;
  },

  find({ id }: { id: ResourceId }): ResourceDefinition | undefined {
    return BY_RESOURCE_ID.get(id);
  },

  list(): ResourceDefinition[] {
    return ALL_DEFS;
  },
};
