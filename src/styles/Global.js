import { css } from 'styled-components';

const Global = css`
  @font-face {
    font-family: 'Basic Grotesque Bold';
    src: url('/fonts/basis_grotesque_bold.otf');
    font-weight: bold;
    font-display: auto;
    font-style: normal;
  }
  @font-face {
    font-family: 'Basic Grotesque Regular';
    src: url('/fonts/BasisGrotesque-Regular.otf');
    font-display: auto;
    font-style: normal;
  }
  @font-face {
    font-family: 'Neue Montreal Bold';
    src: url('/fonts/NeueMontreal-Bold.otf');
    font-display: auto;
    font-style: normal;
  }
  @font-face {
    font-family: 'Neue Montreal Bold Italic';
    src: url('/fonts/NeueMontreal-BoldItalic.otf');
    font-display: auto;
    font-style: normal;
  }
  @font-face {
    font-family: 'Neue Montreal Light';
    src: url('/fonts/NeueMontreal-Light.otf');
    font-display: auto;
    font-style: normal;
  }
  @font-face {
    font-family: 'Neue Montreal';
    src: url('/fonts/NeueMontreal-Regular.otf');
    font-display: auto;
    font-style: normal;
  }
  @font-face {
    font-family: 'Neue Montreal Light Italic';
    src: url('/fonts/NeueMontreal-LightItalic.otf');
    font-display: auto;
    font-style: normal;
  }
  @font-face {
    font-family: 'Syne Regular';
    src: url('/fonts/Syne-Regular.otf');
    font-display: auto;
    font-style: normal;
  }
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
    background: white;
    background-attachment: fixed;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: 'Basic Grotesque Bold', 'Work Sans', sans-serif;
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
    font-family: 'Basic Grotesque Regular', 'Roboto', sans-serif;
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
