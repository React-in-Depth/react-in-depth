import type { Category, Expense } from "~/models/types.client";

import styles from "./PieChart.module.css";

type CategoryWithValue = Category & Pick<Expense, "value">;
type Props = { items: CategoryWithValue[] };

function PieChart({ items }: Props) {
  items.sort(({ value: a }, { value: b }) => b - a);
  const sum = items.reduce((a, { value }) => a + value, 0);
  const incremental = items
    .reduce((list, { value }) => [...list, list[list.length - 1] + value], [0])
    .slice(1);
  const gradientStops = Object.values(incremental)
    .map((value, index) => [
      [items[index].color, 0].join(" "),
      [items[index].color, `${value / sum}turn`].join(" "),
    ])
    .flat()
    .join(",");
  const gradient = `conic-gradient(${gradientStops})`;
  return (
    <section className={styles.wrapper}>
      <div className={styles.pie} style={{ backgroundImage: gradient }} />
      <ul className={styles.legend}>
        {items.map(({ name, color, value }) =>
          value > 0 ? (
            <li key={name} className={styles.label}>
              <span style={{ backgroundColor: color }} className={styles.dot} />
              {name}
            </li>
          ) : null,
        )}
      </ul>
    </section>
  );
}

export default PieChart;
