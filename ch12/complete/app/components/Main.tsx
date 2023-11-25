import { PropsWithChildren } from "react";

import styles from "./main.module.css";

export function Main({ children }: PropsWithChildren) {
  return <main className={styles.main}>{children}</main>;
}
