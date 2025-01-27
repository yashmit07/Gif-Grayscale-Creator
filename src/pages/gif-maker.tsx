import Head from "next/head";
import Navbar from "@/components/Navbar";
import Upload from "@/components/Upload";
import styles from "./GifMaker.module.scss";
import { useState } from "react";
import Preview from "@/components/gif-maker/PreviewGif";
import Create from "@/components/gif-maker/CreateGif";
import ImageGallery from "@/components/gif-maker/ImageGallery";
import { SPEED_OPTIONS } from "@/constants/gif";

export default function GIFMaker() {
  const [urls, setUrls] = useState<Array<string>>([]);
  const [uploadKey, setUploadKey] = useState(0); // Add key to reset CreateGif component
  const [speed, setSpeed] = useState<number>(SPEED_OPTIONS.NORMAL);

  const handleFinish = (uploadedUrls: Array<string>) => {
    console.log("Uploaded URLs:", uploadedUrls);

    /*
    * Your GIF Maker logic might start here
    */

    if (uploadedUrls.length > 20) {
      alert('Maximum 20 images allowed for GIF creation');
      return;
    }

    setUrls(uploadedUrls);
    setUploadKey(prev => prev + 1); // Increment key to trigger reset (CreateGif Component)
  };

  const handleDelete = (urlToDelete: string) => {
    setUrls(urls => urls.filter(url => url !== urlToDelete));
    setUploadKey(prev => prev + 1);
  };

  const handleReorder = (newUrls: string[]) => {
    setUrls(newUrls);
    setUploadKey(prev => prev + 1);
  };

  return (
    <>
      <Head>
        <title>Gif Maker — Kapwing Interview</title>
        <meta
          name="description"
          content="This gif maker handles uploading multiple images, allows the user to preview the images playing one after another, and returns the a completed GIF."
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
          <h1 className={styles.header}>GIF Maker</h1>
          <p>
            This GIF Maker allows the user to upload multiple files, preview the
            images together as a slideshow, and then create the final GIF.
          </p>
          <div className={styles.uploader}>
            <Upload handleFinish={handleFinish} />
          </div>
          {urls.length > 0 && (
            <div className={styles.tool}>
              <div className={styles.speedControl}>
                <label>Animation Speed: </label>
                <select 
                  value={speed} 
                  onChange={e => {
                    setSpeed(Number(e.target.value));
                    setUploadKey(prev => prev + 1);
                  }}
                >
                  <option value={SPEED_OPTIONS.SLOW}>Slow</option>
                  <option value={SPEED_OPTIONS.NORMAL}>Normal</option>
                  <option value={SPEED_OPTIONS.FAST}>Fast</option>
                </select>
              </div>
              <ImageGallery 
                urls={urls} 
                onDelete={handleDelete}
                onReorder={handleReorder}
              />
              <Preview urls={urls} interval={speed}/>
              <Create urls={urls} speed={speed} key={uploadKey}/>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
