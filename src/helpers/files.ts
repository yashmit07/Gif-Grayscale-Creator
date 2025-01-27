import fs from "fs";
import path from "path";
import tmp from "tmp";
import fetch from "node-fetch";
import { nanoid } from "nanoid";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Ensure environment variables exist
if (!process.env.AWS_ACCESS_KEY_ID) throw new Error('AWS_ACCESS_KEY_ID is not set');
if (!process.env.AWS_SECRET_ACCESS_KEY) throw new Error('AWS_SECRET_ACCESS_KEY is not set');
if (!process.env.AWS_BUCKET_NAME) throw new Error('AWS_BUCKET_NAME is not set');

export const getNameAndExtensionFromUrl = (
  url: string
): { basename: string; filename: string; extension: string } => {
  if (!url) {
    throw new Error("No URL provided.");
  }

  const extension = path.extname(url);
  const basename = path.basename(url, extension);

  if (!basename) {
    throw new Error("No filename found for the provided URL.");
  }

  return { basename, filename: basename + extension, extension };
};

export const makeTempFilePath = (filename: string): string => {
  const tmpobj = tmp.fileSync({
    name: `${nanoid(8)}-${filename}`,
  });
  return tmpobj.name;
};

export const makeTempFilePathFromUrl = (url: string): string => {
  const { filename } = getNameAndExtensionFromUrl(url);
  const localFileUrl = makeTempFilePath(filename);
  return localFileUrl;
};

// this function takes a url, downloads the file
// to a temporary local file, and returns the path
// to the downloaded file
export const downloadFileFromUrl = async (url: string) => {
  try {
    const { filename } = getNameAndExtensionFromUrl(url);
    const tempFilepath = makeTempFilePath(filename);
    const res = await fetch(url);
    const fileStream = fs.createWriteStream(tempFilepath);
    await new Promise((resolve, reject) => {
      if (!res || !res.body) {
        throw new Error("No response found for the provided URL.");
      }
      res.body.pipe(fileStream);
      res.body.on("error", reject);
      fileStream.on("finish", resolve);
    });
    return tempFilepath;
  } catch (error) {
    console.error("An error occurred while downloading:", error);
  }
};

// this function takes a local file path,
// uploads that file to Amazon S3
// then returns the publicly accessible link
export const uploadFileFromLocalPath = async (
  localPath: string,
  storageName: string
) => {
  try {
    const s3 = new S3Client({
      region: process.env.AWS_REGION || 'us-east-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: storageName,
      Body: fs.readFileSync(localPath),
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);
    const s3Url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${storageName}`;
    return s3Url;
  } catch (error) {
    console.error("An error occurred while uploading:", error);
    throw error;
  }
};
