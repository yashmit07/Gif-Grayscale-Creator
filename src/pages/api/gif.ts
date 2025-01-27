import type { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";
import GifEncoder from "gif-encoder";
import fs from "fs";
import { SPEED_OPTIONS } from "@/constants/gif";
import {
  downloadFileFromUrl,
  makeTempFilePathFromUrl,
  uploadFileFromLocalPath,
} from "@/helpers/files";

type ResponseData = {
  gifUrl: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  /*
   *
   * Your server side GIF maker implementation should start here
   *
   * One way to do this is using sharp and GifEncoder
   *
   */
  const { body } = req;
  const { urls, speed, fileName } = body;
  
  let speedName;
  if (speed === SPEED_OPTIONS.SLOW) {
    speedName = 'slow';
  }
  else if (speed === SPEED_OPTIONS.NORMAL){
    speedName = 'normal';
  }
  else if (speed === SPEED_OPTIONS.FAST){
    speedName = 'fast'; 
  }
  // Download all images to local filesystem
  const localPaths = await Promise.all(
    urls.map((url: string) => downloadFileFromUrl(url))
  );

  if (localPaths.some(path => path === undefined)) {
    return res.status(500).json({ 
      error: 'Failed to download one or more images',
      gifUrl: '' 
    });
  }

  // create a temp path for the output file
  const outputPath = makeTempFilePathFromUrl(urls[0]);

  // setup gif encoder with dimensions
  const encoder = new GifEncoder(400, 400);
  const writeStream = fs.createWriteStream(outputPath);
  encoder.pipe(writeStream);

  encoder.writeHeader();

  encoder.setRepeat(0);  // 0 means loop forever
  encoder.setDelay(speed); // Use the same interval as preview

  // use sharp to process each image and add to gif
  for (const path of localPaths) {
    const frame = await sharp(path)
      .rotate()
      .resize(400, 400, { 
        fit: 'contain', // Preserve aspect ratio
        background: { r: 255, g: 255, b: 255, alpha: 1 } // White background
      })
      .ensureAlpha()
      .raw() // Get raw pixel data for gif-encoder
      .toBuffer();
    encoder.addFrame(frame);
  }

  encoder.finish();

  // Upload the GIF to AWS
  const uploadedUrl = await uploadFileFromLocalPath(
    outputPath,
    `${fileName}-${speedName}.gif`
  );

  // Return the GIF url back to the client
  if (uploadedUrl) {
    return res.status(200).json({ gifUrl: uploadedUrl });
  }

  return res.status(500).json({ 
    error: 'Failed to upload GIF',
    gifUrl: '' 
  });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};
