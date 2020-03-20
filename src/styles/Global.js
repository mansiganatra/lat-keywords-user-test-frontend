import { css } from 'styled-components';

const Global = css`
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
    background-color: #f9f9fb;
    background-attachment: fixed;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-variant: normal;
    line-height: 26.4px;
    color: #172d3b;
  }
  h1 {
    font-size: 1.8rem;
    font-weight: 700;
  }
  h2 {
    font-size: 1.6rem;
    font-weight: 700;
  }
  h3 {
    font-size: 1.2rem;
    font-weight: 700;
  }
  p {
    font-size: 1rem;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
    line-height: 20px;
  }
  img {
    width: 100%;
    height: auto;
  }
  pre {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 1.3rem;
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
    line-height: 18.5714px;
  }
`;

export default Global;
