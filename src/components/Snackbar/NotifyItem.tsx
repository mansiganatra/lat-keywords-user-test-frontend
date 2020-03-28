import React from 'react';
import styled from 'styled-components';

interface NotifyItemProps {
  handleClose: () => void;
  item: string;
}

const NotifyItem = ({ handleClose, item }: NotifyItemProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleClose();

    const message = {
      call: 'setDocumentListParams', // call
      args: [{ q: `${item}` }] // arguments
    };
    window.parent.postMessage(message, '*');
  };
  return (
    <StyledNotifyItem onClick={handleClick}>
      <StyledNotifyText>{item}</StyledNotifyText>
    </StyledNotifyItem>
  );
};

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
  font-family: 'Archivo', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 1.1rem;
  line-height: 125%;
  padding-right: 0;
  /* or 14px */

  text-align: center;

  color: #ffffff;
`;

export default NotifyItem;
