import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to EhgCorp System</h1>
        <h2 className={styles.subtitle}>Sign In To Have Access</h2>
        <Link href="/login">
          <button className={styles.button}>Sign In</button>
        </Link>
      </div>
    </div>
  );
}
