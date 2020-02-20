import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

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
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="search"
          value={search}
          onChange={handleChange}
          placeholder="keyword search"
        />
        <Button type="submit">Submit</Button>
      </form>
    </FormContainer>
  );
};
const Input = styled.input`
  border: 1px solid black;
  padding: 7px 20px;
`;
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  padding: 7px;
`;

export default SearchBar;
