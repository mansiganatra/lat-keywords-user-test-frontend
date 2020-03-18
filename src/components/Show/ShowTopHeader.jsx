import React from 'react';
import styled from 'styled-components';
import ToolTipModal from '../ToolTipModal/ToolTipModal';
import moreInfo from '../../lib/more_info.png';

const Header = () => (
  <StyledHeaderMessage>
    <StyledHeaderMain>
      <StyledHeader>Find words associated with your search term</StyledHeader>
      <div>
        <img src={moreInfo} alt="more info" onMouseEnter={() => {}} />
      </div>
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
  font-size: 21px;
  line-height: 26px;
  text-transform: capitalize;

  width: 100%;
  max-width: 243px;
`;
const StyledSubHeader = styled.div`
  padding-top: 6px;
  width: 100%;
  max-width: 275px;
`;
const StyledSubHeaderText = styled.p`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.5);
`;

export default Header;
