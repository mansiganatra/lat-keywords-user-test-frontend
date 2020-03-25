import React from 'react';
import styled from 'styled-components';

import ModelItem from '../Models/Model';
import colorArray from '../../utils/colorArray';
import { State, Model } from '../../types';

interface Props {
  sortBy: string;
  state: State;
  selectedId: number | null;
  selectModel: (id: number | null) => void;
  setKeywordRef: (bool: boolean) => void;
  deleteModel: (modelId: number) => void;
}

const SearchShowBot = ({
  sortBy,
  state,
  selectedId,
  selectModel,
  setKeywordRef,
  deleteModel
}: Props): JSX.Element => {
  const { models } = state;

  return (
    <StyledSearchShowBot>
      <StyledModelList>
        {models?.length > 0 &&
          models.map((model: Model, i: number) => (
            <ModelItem
              key={model.id}
              model={model}
              topBarColor={colorArray[i]}
              sortBy={sortBy}
              selectedId={selectedId}
              selectModel={selectModel}
              setKeywordRef={setKeywordRef}
              deleteModel={deleteModel}
            />
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
