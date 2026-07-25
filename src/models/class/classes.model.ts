import barbarianData from "../../data/classes/barbarian.json" with { type: "json" };

import type { SkillName } from "src/models/skills/skills.model";
import bardData from "../../data/classes/bard.json" with { type: "json" };
import clericData from "../../data/classes/cleric.json" with { type: "json" };
import druidData from "../../data/classes/druid.json" with { type: "json" };
import fighterData from "../../data/classes/fighter.json" with { type: "json" };
import monkData from "../../data/classes/monk.json" with { type: "json" };
import paladinData from "../../data/classes/paladin.json" with { type: "json" };
import rangerData from "../../data/classes/ranger.json" with { type: "json" };
import rogueData from "../../data/classes/rogue.json" with { type: "json" };
import sorcererData from "../../data/classes/sorcerer.json" with { type: "json" };
import warlockData from "../../data/classes/warlock.json" with { type: "json" };
import wizardData from "../../data/classes/wizard.json" with { type: "json" };

export type ManualClassification = "martial" | "spell-caster" | "versatile";

export type ProficiencyKey =
  | "light-armor"
  | "medium-armor"
  | "heavy-armor"
  | "shields"
  | "simple-weapons"
  | "martial-weapons";

export type CharacterClass =
  | "barbarian"
  | "bard"
  | "cleric"
  | "druid"
  | "fighter"
  | "monk"
  | "paladin"
  | "ranger"
  | "rogue"
  | "sorcerer"
  | "warlock"
  | "wizard";

type HitDie = "d6" | "d8" | "d10" | "d12";

// A proficiency grant may be partial: monk/rogue get martial weapons restricted
// to certain properties (e.g. "martial weapons that have the Light property").
export type ProficiencyGrant = boolean | { property: string[] };

export type ClassDetails = {
  id: CharacterClass;
  label: string;
  icon: string;
  hitDie: HitDie;
  saves: string;
  description: string;
  manualClassification: ManualClassification;
  proficiencies: Record<ProficiencyKey, ProficiencyGrant> & {
    skills: { n: number; options: SkillName[] };
    tools?: string[];
  };
};

// Raw JSON is a superset of ClassDetails with widened string fields; validate
// the union fields once at module init so a typo'd hit die or classification
// fails fast instead of surfacing as broken UI.
type RawClass = Omit<ClassDetails, "id">;

type RawClassInput = Omit<RawClass, "hitDie" | "manualClassification" | "proficiencies"> & {
  hitDie: string;
  manualClassification: string;
  proficiencies: Record<ProficiencyKey, ProficiencyGrant> & {
    skills: { n: number; options: string[] };
    tools?: string[];
  };
};

const HIT_DICE = new Set<string>(["d6", "d8", "d10", "d12"] satisfies HitDie[]);
const CLASSIFICATIONS = new Set<string>([
  "martial",
  "spell-caster",
  "versatile",
] satisfies ManualClassification[]);

function parseRawClass(id: CharacterClass, data: RawClassInput): RawClass {
  if (!HIT_DICE.has(data.hitDie)) {
    throw new Error(`Class ${id}: unknown hitDie "${data.hitDie}"`);
  }
  if (!CLASSIFICATIONS.has(data.manualClassification)) {
    throw new Error(`Class ${id}: unknown manualClassification "${data.manualClassification}"`);
  }
  return {
    ...data,
    hitDie: data.hitDie as HitDie,
    manualClassification: data.manualClassification as ManualClassification,
    proficiencies: data.proficiencies as ClassDetails["proficiencies"],
  };
}

const RAW: Record<CharacterClass, RawClass> = {
  barbarian: parseRawClass("barbarian", barbarianData),
  bard: parseRawClass("bard", bardData),
  cleric: parseRawClass("cleric", clericData),
  druid: parseRawClass("druid", druidData),
  fighter: parseRawClass("fighter", fighterData),
  monk: parseRawClass("monk", monkData),
  paladin: parseRawClass("paladin", paladinData),
  ranger: parseRawClass("ranger", rangerData),
  rogue: parseRawClass("rogue", rogueData),
  sorcerer: parseRawClass("sorcerer", sorcererData),
  warlock: parseRawClass("warlock", warlockData),
  wizard: parseRawClass("wizard", wizardData),
};

const ALL: ClassDetails[] = (Object.keys(RAW) as CharacterClass[]).map((id) => ({
  id,
  ...RAW[id],
}));
const BY_ID = new Map<string, ClassDetails>(ALL.map((c) => [c.id, c]));

export const classes = {
  get({ id }: { id: CharacterClass }): ClassDetails {
    const found = BY_ID.get(id);
    if (!found) throw new Error(`Unknown class: ${id}`);
    return found;
  },

  find({ id }: { id: string }): ClassDetails | undefined {
    return BY_ID.get(id);
  },

  list(): readonly ClassDetails[] {
    return ALL;
  },
};
