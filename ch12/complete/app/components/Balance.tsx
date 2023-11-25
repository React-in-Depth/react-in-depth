import styles from "./Balance.module.css";

export function Balance({ amount }: { amount: number }) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <section className={styles.wrapper}>
      <p className={styles.heading}>Balance</p>
      <p className={styles.amount}>{formatter.format(amount)}</p>
    </section>
  );
}
