import type { ActionTiming } from "src/models/actions/combat.model";
import type { Resource } from "src/models/resources/resources.model";
import type { RestType } from "src/models/rest/rest-actions.model";
import styles from "./resource-card.module.css";

type Props = { resource: Resource };

const usesLabel = (uses: number) => `×${uses}`;

const REST_LABELS: Record<RestType, string> = {
  "short-rest": "Short Rest",
  "long-rest": "Long Rest",
};

const TIMING_LABELS: Record<ActionTiming, string> = {
  action: "Action",
  "bonus-action": "Bonus Action",
  reaction: "Reaction",
};

export function ResourceCard({ resource }: Props) {
  const timingLabel = resource.action ? TIMING_LABELS[resource.action] : undefined;
  const metaParts = [timingLabel, `Recharges: ${REST_LABELS[resource.recharge]}`].filter(Boolean);

  const headingId = `resource-card-${resource.id}`;

  return (
    <article className={styles.card} aria-labelledby={headingId}>
      <header className={styles.titleBar}>
        <h3 id={headingId} className={styles.name}>
          {resource.name}
        </h3>
        <span className={styles.usesBadge}>{usesLabel(resource.uses)}</span>
      </header>

      <div className={styles.metaLine}>{metaParts.join(" · ")}</div>

      <div className={styles.textBox}>
        <p>{resource.description}</p>
      </div>
    </article>
  );
}
