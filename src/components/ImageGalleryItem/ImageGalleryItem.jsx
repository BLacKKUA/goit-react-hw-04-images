import {
  GalleryImageItem,
  GalleryImageItemImage,
} from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image, onClickModal, getImage }) => {
  return (
    <GalleryImageItem
      key={image.id}
      onClick={() => {
        onClickModal();
        getImage(image.webformatURL, image.tags);
      }}
    >
      <GalleryImageItemImage
        src={image.webformatURL}
        alt={image.tags}
        width="180"
      />
    </GalleryImageItem>
  );
};

export default ImageGalleryItem;
