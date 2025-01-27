import { APIRoute } from "next-s3-upload";
import { nanoid } from "nanoid";

// Ensure environment variables exist and get their typed values
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_REGION = process.env.AWS_REGION || 'us-east-2';

// Validate environment variables
if (!AWS_ACCESS_KEY_ID) throw new Error('AWS_ACCESS_KEY_ID is not set');
if (!AWS_SECRET_ACCESS_KEY) throw new Error('AWS_SECRET_ACCESS_KEY is not set');
if (!AWS_BUCKET_NAME) throw new Error('AWS_BUCKET_NAME is not set');

/*
 * The upload logic in this repo is handled by the next-s3-upload package
 * More information can be found here: https://next-s3-upload.codingvalue.com/
 * You likely don't need to modify this file.
 *
 */
export default APIRoute.configure({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  bucket: AWS_BUCKET_NAME,
  region: AWS_REGION,
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
