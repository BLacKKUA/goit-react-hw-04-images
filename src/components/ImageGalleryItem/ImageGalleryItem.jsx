import {
  GalleryImageItem,
  GalleryImageItemImage,
} from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ gallery }) => {
  return gallery.hits.map(data => {
    return (
      <GalleryImageItem key={data.id}>
        <GalleryImageItemImage
          src={data.webformatURL}
          alt={data.tags}
          width="180"
        />
      </GalleryImageItem>
    );
  });
};

export default ImageGalleryItem;
