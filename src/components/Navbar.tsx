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
      <Link href="/" className={styles.logo}>
        <Image 
          src={kapwingLogo}
          alt="Kapwing Logo"
          width={100}
          height={24}
        />
      </Link>
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