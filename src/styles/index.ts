import { createGlobalStyle } from 'styled-components';

import Reset from './Reset';
import Global from './Global';

const GlobalStyle = createGlobalStyle`
  ${Reset}
  ${Global}
`;

export default GlobalStyle;
