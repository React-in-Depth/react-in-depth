import { Form } from "@remix-run/react";

import styles from "./swap.module.css";

export function Swap({ title, onSubmit, ...rest }) {
  return (
    <Form method="POST" className={styles.form} onSubmit={onSubmit}>
      <button className={styles.button} {...rest}>
        <img src="/icons/swap.svg" width="12" height="12" alt={title} />
      </button>
    </Form>
  );
}
