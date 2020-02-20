import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Uploader = ({ setUploadPath }) => {
  const [state, setState] = useState({
    input_path: '',
    is_ocr: false
  });

  let history = useHistory();

  const handleChange = e => {
    setState({
      ...state,
      input_path: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log(state);
      // await setUploadPath(state)
      setState({
        ...state,
        input_path: ''
      });

      history.push('/dash');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={state.input_path}
          onChange={handleChange}
          name="input_path"
          placeholder="Upload full path"
        />
        <button type="submit">Submit</button>
      </form>
    </Container>
  );
};

const Container = styled.div``;

export default Uploader;
