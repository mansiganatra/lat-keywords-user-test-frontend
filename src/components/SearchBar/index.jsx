import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import searchImage from '../../lib/search.png';

import Slider from '../Slider';
import './SearchBar.css';

const SearchBar = ({ getKeywords, size, startSearch }) => {
  const [search, setSearch] = useState('');

  let { docset } = useParams();
  const handleChange = e => {
    setSearch(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      getKeywords(search, size);
      startSearch();
      setSearch('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <img src={searchImage} alt="search" />
      <input
        type="text"
        name="search"
        value={search}
        onChange={handleChange}
        placeholder="Search keyword from document set"
      />
    </form>
  );
};

export default SearchBar;
