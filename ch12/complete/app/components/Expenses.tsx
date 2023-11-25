import { PropsWithChildren } from "react";
import type { Category, Expense } from "../models/types.client";

import styles from "./Expenses.module.css";

type Props = Pick<Expense, "item" | "value"> & {
  category: Pick<Category, "name" | "color">;
};

export function List({ children }: PropsWithChildren) {
  return <section className={styles.list}>{children}</section>;
}

export function ExpenseItem({ item, category, value }: Props) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <p className={styles.row}>
      <span className={styles.item}>{item}</span>
      <span className={styles.tag} style={{ backgroundColor: category.color }}>
        {category.name}
      </span>
      <span className={styles.value}>{formatter.format(value)}</span>
    </p>
  );
}
