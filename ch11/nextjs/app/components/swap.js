import Image from "next/image";
import styles from "./swap.module.css";

function Swap({ title, ...rest }) {
  return (
    <button className={styles.swap} {...rest}>
      <Image src="/icons/swap.svg" width="12" height="12" alt={title} />
    </button>
  );
}

export default Swap;
