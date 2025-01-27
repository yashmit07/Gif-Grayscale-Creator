import styles from './ImageGallery.module.scss';

interface ImageGalleryProps {
  urls: string[];
  onDelete: (url: string) => void;
  onReorder: (urls: string[]) => void;
}

const ImageGallery = ({ urls, onDelete, onReorder }: ImageGalleryProps) => (
  <div className={styles.container}>
    <div className={styles.hint}>Drag to reorder • Click × to delete</div>
    <div className={styles.gallery}>
      {urls.map((url, i) => (
        <div 
          key={url}
          draggable 
          className={styles.thumbnail}
          onDragStart={e => e.dataTransfer.setData('text', i.toString())}
          onDragOver={e => e.preventDefault()}
          onDrop={e => {
            e.preventDefault();
            const from = Number(e.dataTransfer.getData('text'));
            const newUrls = [...urls];
            newUrls.splice(i, 0, ...newUrls.splice(from, 1));
            onReorder(newUrls);
          }}
        >
          <img src={url} alt={`Frame ${i + 1}`} />
          <button onClick={() => onDelete(url)}>×</button>
        </div>
      ))}
    </div>
  </div>
);

export default ImageGallery;