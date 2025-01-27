import { useS3Upload } from "next-s3-upload";
import { ChangeEvent, useState } from "react";
import styles from "./Upload.module.scss";

interface UploadProps {
  handleFinish: (urls: Array<string>) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

const Upload = ({ handleFinish }: UploadProps) => {
  const [showProgress, setShowProgress] = useState(false);
  let { uploadToS3, files, resetFiles } = useS3Upload();

  let handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!(event.target instanceof HTMLInputElement)) return;
    if (
      event &&
      event.target &&
      event.target.files &&
      event.target.files.length > 0
    ) {

      // Validate file size
      const oversizedFile = Array.from(event.target.files).find(
        file => file.size > MAX_FILE_SIZE
      );

      if (oversizedFile) {
        alert(`File ${oversizedFile.name} exceeds maximum size of 5MB`);
        event.target.value = '';
        return;
      }

      // Validate image formats
      const validImageTypes = ['image/jpeg', 'image/png'];
      const invalidFile = Array.from(event.target.files).find(
        file => !validImageTypes.includes(file.type)
      );

      if (invalidFile) {
        alert('Please upload only JPG or PNG images');
        event.target.value = '';
        return;
      }


      setShowProgress(true);
      const s3Urls = [];
      const files = event.target.files;
      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        const { url } = await uploadToS3(file);
        s3Urls.push(url);
      }
      setTimeout(() => {
        setShowProgress(false);
      }, 1500);
      handleFinish(s3Urls);
      resetFiles();
    }
  };

  const renderShowProgress = () => {
    return (
      <div className={styles.progress}>
        {files.map((file, index) => {
          return (
            <div key={index}>
              {file.file.name}: {Math.ceil(file.progress)}% uploaded
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <input onChange={handleFileChange} type="file" multiple />
      {showProgress && renderShowProgress()}
    </div>
  );
};

export default Upload;
