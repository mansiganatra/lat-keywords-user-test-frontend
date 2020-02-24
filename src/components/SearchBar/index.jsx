import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import './SearchBar.css';

const SearchBar = ({ getKeywords }) => {
  const [search, setSearch] = useState('');

  let { docset } = useParams();
  const handleChange = e => {
    setSearch(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      docset = docset.split('=')[1];
      await getKeywords(search, docset);
      setSearch('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        value={search}
        onChange={handleChange}
        placeholder="keyword search"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
