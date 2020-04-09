import React, { useState } from 'react';
import styled from 'styled-components';

import ToolTipModal from '../ToolTipModal/ToolTipModal';
import moreInfo from '../../lib/images/more_info.png';
const Header = (): JSX.Element => {
  const [modalEnabled, setModalEnabled] = useState<boolean>(false);

  const handleClick = () => {
    setModalEnabled(prevBool => !prevBool);
  };

  return (
    <StyledHeaderMessage>
      <StyledHeaderMain>
        <StyledHeader>
          Find words associated with your search term
          <span onClick={handleClick}>
            <img src={moreInfo} alt="more info" />
          </span>
          {modalEnabled && <ToolTipModal setModalEnabled={setModalEnabled} />}
        </StyledHeader>
      </StyledHeaderMain>
    </StyledHeaderMessage>
  );
};

const StyledHeaderMessage = styled.header`
  animation-name: animate;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;

  @keyframes animate {
    from {
      padding: 15px 0;
    }
    to {
      padding: 20px 0;
    }
  }
`;
const StyledHeaderMain = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 2.4rem;
  line-height: 31px;
  width: 100%;
  max-width: 404px;
`;
const StyledHeader = styled.h1`
  font-family: 'Archivo', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 1.7rem;
  line-height: 18px;
  /* or 106% */

  /* #FAFAFB */

  color: #fafafb;

  width: 100%;
  max-width: 243px;

  span {
    padding-left: 10px;
    cursor: pointer;

    img {
      width: inherit;
      position: relative;
      top: 2px;
    }
  }
`;

export default Header;
