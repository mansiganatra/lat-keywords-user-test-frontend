import { createGlobalStyle } from 'styled-components';

import Reset from '.';
import Global from './Global';

const GlobalStyle = createGlobalStyle`
  ${Reset}
  ${Global}
`;

export default GlobalStyle;
