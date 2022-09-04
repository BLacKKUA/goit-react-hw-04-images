import { useState } from 'react';
import { BarSearch, FormSearch } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [inputFilter, setInputFilter] = useState('');
  const handleInputChange = event => {
    setInputFilter(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (inputFilter.trim() === '') {
      alert('Введите название');
      return;
    }
    onSubmit(inputFilter);
    setInputFilter('');
  };

  return (
    <BarSearch>
      <FormSearch onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          type="text"
          value={inputFilter}
          onChange={handleInputChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </FormSearch>
    </BarSearch>
  );
};
export default Searchbar;
