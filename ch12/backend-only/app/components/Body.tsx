import { PropsWithChildren } from "react";

import styles from "./body.module.css";

export function Body({ children }: PropsWithChildren) {
  return <body className={styles.body}>{children}</body>;
}
