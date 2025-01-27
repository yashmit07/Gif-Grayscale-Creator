import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Gif and Grayscale Creator</title>
      </Head>
      <main className={styles.main}>
        <Navbar />
        <div className={styles.body}>
        <h1 className={styles.header}>
          Gif and Grayscale <span className={styles.gradient}>Creator</span> by Yashmit Singh
        </h1>
          <div className={styles.content}>
            <p className={styles.p}>
              Hi! I&apos;m Yashmit and this is my implementation of a GIF and Grayscale Maker.
            </p>
            <div className={styles.buttons}>
              <a 
                href="https://github.com/yashmit07/interview?tab=readme-ov-file" 
                className={styles.button}
              >
                View README
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
