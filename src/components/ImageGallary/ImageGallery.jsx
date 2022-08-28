import { Component } from 'react';
import { GalleryImage } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Circles } from 'react-loader-spinner';
import { ButtonLoadMore } from '../LoadMore/LoadMore';

export default class ImageGallery extends Component {
  state = {
    gallery: '',
    page: 1,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.inputFilter !== this.props.inputFilter ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true, gallery: '' });
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
            gallery: [...prevState.gallery, ...gallery],
            loading: false,
          }));
        })
        .catch(error => this.setState({ error }));
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
          <ImageGalleryItem gallery={this.state.gallery} />
        )}

        {(this.state.gallery !== '') & (this.state.gallery.total !== 0) ? (
          <ButtonLoadMore onClick={this.loadMore} />
        ) : (
          ''
        )}
      </GalleryImage>
    );
  }
}
