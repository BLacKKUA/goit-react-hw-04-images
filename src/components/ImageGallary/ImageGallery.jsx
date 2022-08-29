import { Component } from 'react';
import { GalleryImage } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Circles } from 'react-loader-spinner';
import { ButtonLoadMore } from '../LoadMore/LoadMore';
import Modal from '../Modal/Modal';

export default class ImageGallery extends Component {
  state = {
    gallery: '',
    page: 1,
    loading: false,
    modal: false,
    currentUrl: '',
    currentTags: '',
    total: 0,
    totalHits: 0,
  };

  toggleModal = () => {
    this.setState(state => ({
      modal: !state.modal,
    }));
  };

  getImage = (webformatURL, tags) => {
    this.setState({ currentUrl: webformatURL, currentTags: tags });
  };

  fetchData = () => {
    fetch(
      `https://pixabay.com/api/?q=${this.props.inputFilter}&page=${this.state.page}&key=28372607-30c2f074d06c20b95d41a8fad&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(gallery => {
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...gallery.hits],
          loading: false,
          total: prevState.total + gallery.hits.length,
          totalHits: gallery.totalHits,
        }));
      })
      .catch(error => this.setState({ error }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.setState({ loading: true });
      this.fetchData();
    }
    if (prevProps.inputFilter !== this.props.inputFilter) {
      this.setState({ loading: true, gallery: '', page: 1, total: 0 });
      this.fetchData();
    }
  }
  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    return (
      <GalleryImage className="gallery">
        {this.state.loading && (
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
        {this.state.gallery.total === 0 ? (
          <h1>
            Maybe u made miss? We didn't find photos with this name
            {this.props.inputFilter}
          </h1>
        ) : null}
        {this.state.gallery === '' ? (
          <p>Enter name images</p>
        ) : (
          <ImageGalleryItem
            gallery={this.state.gallery}
            onClickModal={this.toggleModal}
            getImage={this.getImage}
          />
        )}

        {(this.state.gallery !== '') &
        (this.state.gallery.total !== 0) &
        (this.state.totalHits !== this.state.total) ? (
          <ButtonLoadMore onClick={this.loadMore} />
        ) : (
          ''
        )}
        {this.state.modal && (
          <Modal
            Url={this.state.currentUrl}
            Tags={this.state.currentTags}
            onClose={this.toggleModal}
          />
        )}
      </GalleryImage>
    );
  }
}
