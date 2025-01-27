import React, { useState, useEffect } from "react";
import styles from "./PreviewGif.module.scss";

interface PreviewGifProps {
  urls: Array<string>;
  interval: number;
}

const PreviewGif = ({ urls, interval }: PreviewGifProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
      if (urls.length === 0) 
        return;

      const timer = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % urls.length);
      }, interval);

      return () => clearInterval(timer);
    }, [urls, interval]);

    if (urls.length === 0) 
        return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>Preview of animated GIF:</div>
      <img 
        key={urls[currentIndex]}
        src={urls[currentIndex]} 
        alt={`Preview frame ${currentIndex + 1}`} 
        className={styles.image}
      />
      <div className={styles.info}>
        Frame {currentIndex + 1} of {urls.length}
        <div className={styles.timing}>
          Preview speed: {interval}ms between frames
        </div>
      </div>
    </div>
  );
};

export default PreviewGif;