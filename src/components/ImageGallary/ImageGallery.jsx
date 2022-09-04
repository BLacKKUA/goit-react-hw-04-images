import { useState, useEffect } from 'react';
import { GalleryImage } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Circles } from 'react-loader-spinner';
import { ButtonLoadMore } from '../LoadMore/LoadMore';
import Modal from '../Modal/Modal';
import FetchData from '../../FetchData/FetchData';

const ImageGallery = ({ inputFilter }) => {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [currentTags, setCurrentTags] = useState('');
  const [total, setTotal] = useState(0);
  const [totalHits, setTotalHits] = useState(0);
  const [firstStart, setFirstStart] = useState(true);
  const [inputTest, setInputTest] = useState('');

  const toggleModal = () => {
    setModal(!modal);
  };

  const getImage = (webformatURL, tags) => {
    setCurrentUrl(webformatURL);
    setCurrentTags(tags);
  };

  useEffect(() => {
    if (firstStart !== true) {
      setLoading(true);
      if (inputTest !== inputFilter) {
        setGallery('');
        setPage(1);
        setTotal(0);
      }
      FetchData(inputFilter, page)
        .then(gallery => {
          setGallery(prevState => [...prevState, ...gallery.hits]);
          setLoading(false);
          setTotal(total + gallery.hits.length);
          setTotalHits(gallery.totalHits);
          setInputTest(inputFilter);
        })
        .catch(error => this.setState({ error }));
    } else {
      setFirstStart(false);
    }
  }, [inputFilter, page]);

  const loadMore = () => {
    setPage(page + 1);
  };
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
      {gallery.total === 0 ? (
        <h1>
          Maybe u made miss? We didn't find photos with this name
          {inputFilter}
        </h1>
      ) : null}
      {gallery === '' ? (
        <p>Enter name images</p>
      ) : (
        <ImageGalleryItem
          gallery={gallery}
          onClickModal={toggleModal}
          getImage={getImage}
        />
      )}

      {(gallery !== '') & (gallery.total !== 0) & (totalHits !== total) ? (
        <ButtonLoadMore onClick={loadMore} />
      ) : (
        ''
      )}
      {modal && (
        <Modal Url={currentUrl} Tags={currentTags} onClose={toggleModal} />
      )}
    </GalleryImage>
  );
};
export default ImageGallery;
