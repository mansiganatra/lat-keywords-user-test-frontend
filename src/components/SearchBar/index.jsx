import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import Slider from '../Slider';
import './SearchBar.css';

const SearchBar = ({ getKeywords }) => {
  const [search, setSearch] = useState('');
  const [size, setSize] = useState(10);

  let { docset } = useParams();
  const handleChange = e => {
    setSearch(e.target.value);
  };

  const handleResize = val => {
    setSize(val);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      docset = docset.split('=')[1];
      await getKeywords(search, docset, size);
      setSearch('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleChange}
          placeholder="keyword search"
        />
        <button type="submit">Search</button>
      </div>
      <div>
        <Slider handleResize={handleResize} />
      </div>
    </form>
  );
};

export default SearchBar;
