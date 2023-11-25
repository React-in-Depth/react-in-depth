import { PropsWithChildren } from "react";

import styles from "./Dialog.module.css";

export function Dialog({ children }: PropsWithChildren) {
  return (
    <aside className={styles.background}>
      <section className={styles.dialog}>{children}</section>
    </aside>
  );
}
