import React, { useState } from 'react';
import styled from 'styled-components';
import ToolTipModal from '../ToolTipModal/ToolTipModal';
import moreInfo from '../../lib/more_info.png';
import moreInfoAlt from '../../lib/more_info_alt.png';

const Header = (props: any): JSX.Element => {
  const [hover, setHover] = useState<boolean>(false);
  const [modalEnabled, setModalEnabled] = useState<boolean>(false);

  return (
    <StyledHeaderMessage>
      <StyledHeaderMain>
        <StyledHeader>
          Find words associated with your search term
          <span
            onMouseEnter={(): void => setHover(true)}
            onMouseLeave={(): void => setHover(false)}
            onClick={() => setModalEnabled(!modalEnabled)}
          >
            <img src={hover ? moreInfoAlt : moreInfo} alt="more info" />
          </span>
          {modalEnabled && <ToolTipModal setModalEnabled={setModalEnabled} />}
        </StyledHeader>
      </StyledHeaderMain>
      <StyledSubHeader>
        <StyledSubHeaderText>
          Try searching keywords related to each project like “politics” or
          “money.”
        </StyledSubHeaderText>
      </StyledSubHeader>
    </StyledHeaderMessage>
  );
};
const StyledHeaderMessage = styled.header`
  padding-bottom: 40px;
  padding-top: 35px;

  @media (max-width: 625px) {
    display: none;
  }
`;
const StyledHeaderMain = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 24px;
  line-height: 31px;
  width: 100%;
  max-width: 404px;
`;
const StyledHeader = styled.h1`
  position: relative;
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  text-transform: capitalize;

  color: #172d3b;

  width: 100%;
  max-width: 243px;

  span {
    padding-left: 10px;
    cursor: pointer;

    img {
      width: inherit;
    }
  }
`;
const StyledSubHeader = styled.div`
  padding-top: 6px;
  width: 100%;
  max-width: 275px;
`;
const StyledSubHeaderText = styled.p`
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 13px;
  /* or 130% */

  letter-spacing: 0.03em;

  color: rgba(23, 45, 59, 0.35);
`;

export default Header;
