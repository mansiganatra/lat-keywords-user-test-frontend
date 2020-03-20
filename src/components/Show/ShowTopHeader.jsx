import React from 'react';
import styled from 'styled-components';
import ToolTipModal from '../ToolTipModal/ToolTipModal';
import moreInfo from '../../lib/more_info.png';

const Header = () => (
  <StyledHeaderMessage>
    <StyledHeaderMain>
      <StyledHeader>
        Find words associated with your search term
        <span>
          <img src={moreInfo} alt="more info" onMouseEnter={() => {}} />
        </span>
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

const StyledHeaderMessage = styled.header`
  padding-bottom: 40px;
  padding-top: 35px;
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
