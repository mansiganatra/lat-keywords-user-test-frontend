import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ToolTipModal from '../ToolTipModal/ToolTipModal';
import moreInfo from '../../lib/images/more_info.png';
import moreInfoAlt from '../../lib/images/more_info_alt.png';
import SuggestionItem from './SuggestionItem';

interface HeaderProps {
  suggestedList: string[];
}

const Header = ({ suggestedList }: HeaderProps): JSX.Element => {
  const [hover, setHover] = useState<boolean>(false);
  const [modalEnabled, setModalEnabled] = useState<boolean>(false);
  console.log(suggestedList);
  return (
    <StyledHeaderMessage>
      <StyledHeaderMain>
        <StyledHeader>
          Find words associated with your search term
          <span onClick={() => setModalEnabled(!modalEnabled)}>
            <img src={moreInfo} alt="more info" />
          </span>
          {modalEnabled && <ToolTipModal setModalEnabled={setModalEnabled} />}
        </StyledHeader>
      </StyledHeaderMain>
      <StyledSubHeader>
        <StyledSubHeaderText>
          Try searching keywords related to each project like:
        </StyledSubHeaderText>
        <StyledSuggestionListContainer>
          {suggestedList.map(
            (suggested: string): JSX.Element => (
              <SuggestionItem key={suggested} suggested={suggested} />
            )
          )}
        </StyledSuggestionListContainer>
      </StyledSubHeader>
    </StyledHeaderMessage>
  );
};

const StyledSuggestionListContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

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
  font-family: 'Archivo';
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
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
    }
  }
`;
const StyledSubHeader = styled.div`
  padding-top: 6px;
  width: 100%;
  max-width: 275px;
`;
const StyledSubHeaderText = styled.p`
  font-family: 'Archivo';
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  line-height: 125%;
  /* or 14px */

  color: rgba(160, 175, 199, 0.6);
`;

export default Header;
