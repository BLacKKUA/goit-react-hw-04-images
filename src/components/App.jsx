import React, { Component } from 'react';
import { AppStyled } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallary/ImageGallery';

export default class App extends Component {
  state = {
    inputFilter: '',
  };

  handleOnSubmit = inputFilter => {
    this.setState({ inputFilter });
  };

  render() {
    return (
      <AppStyled>
        <>
          <Searchbar onSubmit={this.handleOnSubmit} />
          <ImageGallery inputFilter={this.state.inputFilter} />
        </>
      </AppStyled>
    );
  }
}
