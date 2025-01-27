import { APIRoute } from "next-s3-upload";
import { nanoid } from "nanoid";

if (!process.env.AWS_ACCESS_KEY_ID) throw new Error('AWS_ACCESS_KEY_ID is not set');
if (!process.env.AWS_SECRET_ACCESS_KEY) throw new Error('AWS_SECRET_ACCESS_KEY is not set');
if (!process.env.AWS_BUCKET_NAME) throw new Error('AWS_BUCKET_NAME is not set');

/*
 * The upload logic in this repo is handled by the next-s3-upload package
 * More information can be found here: https://next-s3-upload.codingvalue.com/
 * You likely don't need to modify this file.
 *
 */
export default APIRoute.configure({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucket: process.env.AWS_BUCKET_NAME,
  region: process.env.AWS_REGION || 'us-east-2',
  key(req, filename) {
    try {
      // Ensure filename exists and sanitize it
      const safeFilename = filename ? filename.replace(/[^a-zA-Z0-9.-]/g, '') : 'file';
      return `${nanoid(8)}-${safeFilename}`;
    } catch (error) {
      console.error('Error in key generation:', error);
      throw error;
    }
  },
});
