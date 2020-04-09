import React from 'react';
import styled from 'styled-components';
import Snackbar from '@material-ui/core/Snackbar';

import { State } from '../../types';
import NotifyItem from './NotifyItem';
import XBtn from './XBtn';

interface SnackbarProps {
  notificationIsOpen: boolean;
  setNotificationIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  term: string | null;
  state: State;
}

const SnackbarComponent = ({
  notificationIsOpen,
  setNotificationIsOpen,
  term,
  state
}: SnackbarProps) => {
  const { similarSuggestionslist } = state;

  const handleClose = (): void => {
    setNotificationIsOpen(false);
  };
  return (
    <StyledNotificationContainer
      open={notificationIsOpen}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}
    >
      <StyledContent>
        <StyledLeft>
          <StyledNotifMessage>
            <span>{term}</span> is not found in the document set. Try searching
          </StyledNotifMessage>
          <StyledNotifySuggestionList>
            {similarSuggestionslist.map((suggestion: string) => (
              <NotifyItem
                key={suggestion}
                item={suggestion}
                handleClose={handleClose}
              />
            ))}
          </StyledNotifySuggestionList>
        </StyledLeft>
        <StyledNotifImageContainer onClick={handleClose}>
          <XBtn />
        </StyledNotifImageContainer>
      </StyledContent>
    </StyledNotificationContainer>
  );
};

const StyledNotificationContainer = styled(Snackbar)`
  /* z-index: 3; */
  /* position: fixed; */
  display: flex;
  justify-content: flex-start;
  width: 100%;
  background: #3e5372;
  top: 0;

  animation-name: animateSnack;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;

  @keyframes animateSnack {
    from {
      padding: 15px 30px;
    }
    to {
      padding: 30px;
    }
  }
`;

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const StyledNotifMessage = styled.p`
  font-family: 'Archivo', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 1.4rem;
  line-height: 120%;
  /* or 17px */

  color: #ffffff;

  padding-right: 15px;

  span {
    color: #43d0ce;
    text-transform: capitalize;
  }
`;
const StyledLeft = styled.div`
  display: flex;
  align-items: center;
`;
const StyledNotifySuggestionList = styled.div`
  display: flex;
  align-items: center;
  overflow: auto;

  /* Width */
  &::-webkit-scrollbar {
    /* width: 4px; */
    height: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #1e2229;
    border-radius: 12px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #fafafb;
    border-radius: 6px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #ffffff;
  }
`;

const StyledNotifImageContainer = styled.button`
  display: flex;
  justify-content: center;
  border: 0;
  align-items: center;
  position: relative;
  top: -16px;
  right: -4px;
  background-color: transparent;
`;

export default SnackbarComponent;
