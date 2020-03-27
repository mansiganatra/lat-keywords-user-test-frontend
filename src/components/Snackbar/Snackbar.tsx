import React from 'react';
import styled from 'styled-components';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';

import notifX from '../../lib/images/notif-x.png';
import { State } from '../../types';

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

  const handleClose = () => {
    console.log('clicked');
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
            {similarSuggestionslist.map((item: any, i: number) => {
              const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
                handleClose();

                const message = {
                  call: 'setDocumentListParams', // call
                  args: [{ q: `${item}` }] // arguments
                };
                window.parent.postMessage(message, '*');
              };

              return (
                <StyledNotifyItem key={i} onClick={handleClick}>
                  <StyledNotifyText>{item}</StyledNotifyText>
                </StyledNotifyItem>
              );
            })}
          </StyledNotifySuggestionList>
        </StyledLeft>
        <StyledNotifImageContainer onClick={handleClose}>
          <img src={notifX} alt="x" />
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

  padding: 30px;
`;

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const StyledNotifMessage = styled.p`
  font-family: 'Archivo';
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
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
`;
const StyledNotifyItem = styled.button`
  display: flex;
  justify-content: center;
  border: 1px solid rgba(250, 250, 251, 0.3);
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.02);
  border-radius: 21px;
  background: #3e5372;
  padding: 7px 20px;
  margin-right: 6px;
`;

const StyledNotifyText = styled.p`
  font-family: 'Archivo';
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  line-height: 125%;
  padding-right: 0;
  /* or 14px */

  text-align: center;

  color: #ffffff;
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
