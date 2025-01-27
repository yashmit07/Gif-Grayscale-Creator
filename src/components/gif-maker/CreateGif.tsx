import React, { useState } from "react";
import styles from "./CreateGif.module.scss";

interface CreateGifProps {
  urls: Array<string>;
  speed: number;
}

const CreateGif = ({ urls, speed }: CreateGifProps) => {
  const [loading, setLoading] = useState(false);
  const [gif, setGif] = useState(undefined);
  const [fileName, setFileName] = useState("");

  const create = () => {
    
    const cleanFileName = fileName.trim();
    if (!cleanFileName) {
      alert('Please enter a filename');
      return;
    }

    if (/[/\\:*?"<>|.!]/.test(cleanFileName)) {
      alert('Filename cannot contain special characters (/ \\ : * ? " < > | . !)');
      return;
    }

    const body = {
      urls,
      speed,
      fileName: cleanFileName
    };

    setLoading(true);
    setGif(undefined);

    fetch("/api/gif", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          const { gifUrl } = result;
          setGif(gifUrl);
          setLoading(false);
        },
        (error) => {
          console.error("An error occurred:", error);
          setLoading(false);
        }
      );
  };

  const renderFinalGif = () => {
    if (!gif) return null;
    return (
      <>
        <div className={styles.header}>Final GIF:</div>
        <img src={gif} alt="Final GIF" className={styles.image} />
        <div style={{ marginTop: '16px' }}>
          <a href={gif} download className={styles.button}>
            Download GIF
          </a>
        </div>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        The animation above is a preview of what your GIF will look like. To create your 
        final GIF, enter a filename and click the button below:
      </div>
      {loading ? (
        "Loading ..."
      ) : (
        <div>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Enter filename"
          />
          <input type="button" value="Make GIF" onClick={create} />
        </div>
      )}
      {renderFinalGif()}
    </div>
  );
};

export default CreateGif;