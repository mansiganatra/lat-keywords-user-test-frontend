import React, { useContext } from 'react';
import styled from 'styled-components';
import searchContext from '../../store/searchContext';
import Model from '../Models/Model';
import { colorArray } from '../../utils';

const SearchShowBot = (props: any): JSX.Element => {
  const { docset } = useContext(searchContext);
  const { models } = docset;
  return (
    <StyledSearchShowBot>
      <StyledModelList>
        {!!models?.length &&
          models.map((model, i) => (
            <Model key={i} model={model} topBarColor={colorArray[i]} />
          ))}
      </StyledModelList>
    </StyledSearchShowBot>
  );
};

const StyledSearchShowBot = styled.section`
  overflow: auto;
  overflow-y: hidden;
  transform: rotateX(180deg);
  padding-left: 50px;
  padding-bottom: 20px;

  @media (max-width: 700px) {
    padding-left: 15px;
  }
`;
const StyledModelList = styled.div`
  display: flex;
  transform: rotateX(180deg);
  padding-top: 10px;
  padding-bottom: 40px;
`;

export default SearchShowBot;
