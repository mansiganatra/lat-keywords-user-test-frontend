import React from 'react';
import styled from 'styled-components';
import modalPointer from '../../lib/modalpointer.png';
import modalX from '../../lib/modal_x.png';

const ToolTipModal = ({ setModalEnabled }) => {
  const handleClick = () => {
    setModalEnabled(false);
  };
  return (
    <>
      <StyledModalImageContainer>
        <StyledModalImage src={modalPointer} alt="arror" />
      </StyledModalImageContainer>
      <Container>
        <StyledTopSection>
          hello
          <button onClick={handleClick}>
            <img src={modalX} alt="x" />
          </button>
        </StyledTopSection>
      </Container>
    </>
  );
};

const StyledModalImageContainer = styled.div`
  position: absolute;
  bottom: -25px;
  right: 62px;
`;
const StyledModalImage = styled.img`
  width: inherit;
`;
const Container = styled.div`
  margin-top: 18px;
  z-index: 999;
  position: absolute;
  width: 434px;
  /* max-width: 434px; */
  height: 412px;

  background: #172d3b;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  border-radius: 3px;
`;

const StyledTopSection = styled.div`
  position: relative;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 36px;
    top: 20px;
    border: 0;
    background: #172d3b;

    :hover {
      transform: scale(1.2);
    }
    img {
      width: inherit;
    }
  }
`;

export default ToolTipModal;
