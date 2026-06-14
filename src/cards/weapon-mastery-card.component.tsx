import type { WeaponMastery } from "src/models/weapon-masteries/weapon-masteries.model";
// borrows spell-card stylesheet; no dedicated weapon-mastery layout exists yet
import styles from "./spell-card.module.css";

type Props = { mastery: WeaponMastery };

const MASTERY_STYLE = {
  "--school-color": "var(--school-transmutation)",
} as React.CSSProperties;

export function WeaponMasteryCard({ mastery }: Props) {
  return (
    <article className={styles.card} style={MASTERY_STYLE}>
      <div className={styles.titleBar}>
        <h3 className={styles.name}>{mastery.name}</h3>
      </div>

      <div className={styles.typeLine}>Weapon Mastery</div>

      <div className={styles.textBox}>
        <p>{mastery.description}</p>
      </div>
    </article>
  );
}
