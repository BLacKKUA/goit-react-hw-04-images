import {
  GalleryImageItem,
  GalleryImageItemImage,
} from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ gallery, onClickModal, getImage }) => {
  console.log(gallery);
  return gallery.map(data => {
    return (
      <GalleryImageItem
        key={data.id}
        onClick={() => {
          onClickModal();
          getImage(data.webformatURL, data.tags);
        }}
      >
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
