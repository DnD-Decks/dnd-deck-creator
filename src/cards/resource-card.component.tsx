import type { Resource } from "src/models/resources/resources.model";
import styles from "./resource-card.module.css";

type Props = { resource: Resource };

const usesLabel = (uses: number) => (uses === 1 ? "×1" : `×${uses}`);

export function ResourceCard({ resource }: Props) {
  const metaParts = [resource.action, `Recharges: ${resource.recharge}`].filter(Boolean);

  return (
    <article className={styles.card}>
      <header className={styles.titleBar}>
        <h3 className={styles.name}>{resource.name}</h3>
        <span className={styles.usesBadge}>{usesLabel(resource.uses)}</span>
      </header>

      <div className={styles.metaLine}>{metaParts.join(" · ")}</div>

      <div className={styles.textBox}>
        <p>{resource.description}</p>
      </div>
    </article>
  );
}
