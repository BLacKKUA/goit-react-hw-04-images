import React, { useState } from 'react';
import { AppStyled } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallary/ImageGallery';

const App = () => {
  const [inputFilter, setInputFilter] = useState('');

  const handleOnSubmit = inputFilter => {
    setInputFilter(inputFilter);
  };
  return (
    <AppStyled>
      <>
        <Searchbar onSubmit={handleOnSubmit} />
        <ImageGallery inputFilter={inputFilter} />
      </>
    </AppStyled>
  );
};
export default App;
