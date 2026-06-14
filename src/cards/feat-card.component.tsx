import type { Feat } from "src/models/feats/feats.model";
import styles from "./feat-card.module.css";

type Props = { feat: Feat };

export function FeatCard({ feat }: Props) {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.name}>{feat.name}</h3>
        <span className={styles.source}>{feat.source}</span>
      </header>

      <div className={styles.typeLine}>Class Feature</div>

      <div className={styles.textBox}>
        <p>{feat.description}</p>
      </div>
    </article>
  );
}
