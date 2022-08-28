import { Component } from 'react';
import { BarSearch, FormSearch } from './Searchbar.styled';
export default class Searchbar extends Component {
  state = {
    inputFilter: '',
  };

  handleInputChange = event => {
    this.setState({ inputFilter: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.inputFilter.trim() === '') {
      alert('Введите название');
      return;
    }
    this.props.onSubmit(this.state.inputFilter);
    this.setState({ inputFilter: '' });
  };

  render() {
    return (
      <BarSearch>
        <FormSearch onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            value={this.state.inputFilter}
            onChange={this.handleInputChange}
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </FormSearch>
      </BarSearch>
    );
  }
}
