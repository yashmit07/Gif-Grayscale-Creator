import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kapwing Interview</title>
        <meta
          name="description"
          content="This website contains information, code, and pages that relate to interview projects at Kapwing."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://cdn-useast1.kapwing.com/static/TwE-favicon.ico"
        />
      </Head>
      <main className={styles.main}>
        <Navbar />
        <div className={styles.body}>
        <h1 className={styles.header}>
          Kapwing <span className={styles.gradient}>Interview Project</span> by Yashmit Singh
        </h1>
          <div className={styles.content}>
            <p className={styles.p}>
              Hi! I&apos;m Yashmit and this is my implementation of a GIF maker.
            </p>
            <div className={styles.buttons}>
              <a 
                href="https://github.com/yashmit07/interview?tab=readme-ov-file" 
                className={styles.button}
              >
                View README
              </a>
              <a 
                href="https://docs.google.com/document/d/1f7MpfMQevpiHisR4LlHJLUvprPdp4tepQbx29zW59E0/edit?usp=sharing" 
                className={styles.button}
              >
                View Project Guide
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
