import { css } from 'styled-components';

const Global = css`
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
    background: #f8f8f8;
    margin: 0 auto;
    max-width: 1440px;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: 'Poppins', 'Work Sans', sans-serif;
    line-height: 1.8;
    color: #333333;
  }
  h1 {
    font-size: 3.8rem;
  }
  h2 {
    font-size: 2.4rem;
  }
  p {
    font-size: 1.8rem;
    font-family: 'Roboto', sans-serif;
    color: #333333;
  }
  a {
    text-decoration: none;
    font-size: 1.8rem;
    font-family: 'Roboto', sans-serif;
    color: #333333;
  }
  input,
  textarea,
  button {
    -webkit-appearance: none;
    font-family: 'Roboto', sans-serif;
    color: #333333;
  }
  label {
    font-size: 1.8rem;
    font-family: 'Poppins', 'Work Sans', sans-serif;
    color: #333333;
  }
  input {
    font-family: 'Roboto', sans-serif;
  }
  img {
    width: 100%;
    height: auto;
  }
`;

export default Global;
