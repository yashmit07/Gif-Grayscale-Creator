// Navbar.tsx
import Link from "next/link";
import Image from "next/image"; // Add this import
import { useRouter } from "next/router";
import styles from "./Navbar.module.scss";
import kapwingLogo from 'docs/logo/kapwingLogo.png';

export default function Navbar() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <Link href="/" className={router.pathname == "/" ? styles.activeLink : styles.link}>
          Home
        </Link>
        <Link href="/grayscale" className={router.pathname == "/grayscale" ? styles.activeLink : styles.link}>
          Grayscale
        </Link>
        <Link href="/gif-maker" className={router.pathname == "/gif-maker" ? styles.activeLink : styles.link}>
          GIF Maker
        </Link>
      </div>
    </div>
  );
}