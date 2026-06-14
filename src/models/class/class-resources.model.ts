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
  icon: string;
};

export type CharacterResource = {
  resourceId: ResourceId;
  current: number;
  max: number;
};

// --- Internal raw types ---

type RawResourceEntry = {
  id: ResourceId;
  name: string;
  description: string;
  resetOn: RestType;
  icon: string;
  progression: Record<string, ProgressionValue>;
};

type RawClassEntry = { resources: RawResourceEntry[] };

const RAW = classResourcesData as Record<CharacterClass, RawClassEntry>;

// Deduplicate resource definitions across classes (e.g. spell-slot-1st appears in many classes).
const ALL_DEFS: ResourceDefinition[] = [];
const BY_RESOURCE_ID = new Map<ResourceId, ResourceDefinition>();

for (const classEntry of Object.values(RAW)) {
  for (const r of classEntry.resources) {
    if (!BY_RESOURCE_ID.has(r.id)) {
      const def: ResourceDefinition = {
        id: r.id,
        name: r.name,
        description: r.description,
        icon: r.icon,
      };
      ALL_DEFS.push(def);
      BY_RESOURCE_ID.set(r.id, def);
    }
  }
}

function resolveMax(value: ProgressionValue, scores: AbilityScores): number {
  if (typeof value === "number") return value;
  const abilityName = value.replace("-mod", "") as AbilityName;
  return Math.max(1, computeModifier(scores[abilityName]));
}

export function resolveResourcesForLevel(
  characterClass: CharacterClass,
  level: number,
  abilityScores: AbilityScores
): CharacterResource[] {
  const entry = RAW[characterClass];
  if (!entry) return [];
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
  const resource = entry?.resources.find((r) => r.id === resourceId);
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
