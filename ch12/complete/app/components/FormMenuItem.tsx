import type { PropsWithChildren } from "react";
import { Form } from "@remix-run/react";

import styles from "./Menu.module.css";

export function FormMenuItem({
  to,
  children,
}: PropsWithChildren<{ to: string }>) {
  return (
    <li className={styles.navListItem}>
      <Form method="post" action={to}>
        <button className={styles.navButton}>{children}</button>
      </Form>
    </li>
  );
}
