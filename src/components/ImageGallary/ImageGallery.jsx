import { useEffect, useState } from 'react';

import { ButtonLoadMore } from '../LoadMore/LoadMore';
import { Circles } from 'react-loader-spinner';
import FetchData from '../../FetchData/FetchData';
import { GalleryImage } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';

const ImageGallery = ({ inputFilter }) => {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [currentTags, setCurrentTags] = useState('');
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (inputFilter !== query) {
      setGallery([]);
    }
    setQuery(inputFilter);
  }, [inputFilter, query]);

  useEffect(() => {
    if (query) {
      FetchData(query, page).then(gallery => {
        setGallery(prevHits => [...prevHits, ...gallery.hits]);
        setLoading(false);
        setTotal(gallery.total);
        if (!gallery.total) {
          setError(`Maybe u made miss? We didn't find photos with this name
          ${query}`);
        }
      });
    }
  }, [query, page]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const getImage = (webformatURL, tags) => {
    setCurrentUrl(webformatURL);
    setCurrentTags(tags);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const showButton = gallery.length > 0 && total > gallery.length && !loading;

  return (
    <GalleryImage className="gallery">
      {loading && (
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      {error && <h1> {error} </h1>}
      {gallery?.map(image => (
        <ImageGalleryItem
          image={image}
          onClickModal={toggleModal}
          getImage={getImage}
        />
      ))}
      {showButton && <ButtonLoadMore onClick={loadMore} />}
      {modal && (
        <Modal Url={currentUrl} Tags={currentTags} onClose={toggleModal} />
      )}
    </GalleryImage>
  );
};
export default ImageGallery;
