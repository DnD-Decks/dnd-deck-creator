import type { WeaponMastery } from "src/models/weapon-masteries/weapon-masteries.model";
// borrows spell-card stylesheet; no dedicated weapon-mastery layout exists yet
import styles from "./spell-card.module.css";

type Props = { mastery: WeaponMastery };

const MASTERY_STYLE = {
  "--school-color": "var(--mastery-steel)",
} as React.CSSProperties;

export function WeaponMasteryCard({ mastery }: Props) {
  const headingId = `mastery-card-${mastery.id}`;

  return (
    <article className={styles.card} style={MASTERY_STYLE} aria-labelledby={headingId}>
      <div className={styles.titleBar}>
        <h3 id={headingId} className={styles.name}>
          {mastery.name}
        </h3>
      </div>

      <div className={styles.typeLine}>Weapon Mastery</div>

      <div className={styles.textBox}>
        <p>{mastery.description}</p>
      </div>
    </article>
  );
}
