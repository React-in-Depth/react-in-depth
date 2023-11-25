import type { InputHTMLAttributes } from "react";

import styles from "./IncomeInput.module.css";

export function IncomeInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <section className={styles.wrapper}>
      <p className={styles.heading}>Income</p>
      <input type="number" name="income" className={styles.amount} {...props} />
    </section>
  );
}
