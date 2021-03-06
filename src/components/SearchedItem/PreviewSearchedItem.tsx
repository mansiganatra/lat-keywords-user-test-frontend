import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { axiosWithAuth, query } from '../../utils';
import PreviewKeyword from '../Keywords/PreviewKeyword';

interface PreviewSearchedItemProps {
  term: string;
  color: string;
}

const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const PreviewSearchedItem = ({
  term,
  color
}: PreviewSearchedItemProps): JSX.Element => {
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    if (term.length > 0) {
      const fetch = async () => {
        const { server, apiToken, documentSetId } = query;
        try {
          setKeywords([]);
          const res = await axiosWithAuth(apiToken).get('/search', {
            params: {
              term,
              server,
              documentSetId
            }
          });

          setKeywords(res.data.similarTokens.slice(0, 11));
        } catch (error) {
          console.error(error);
        }
      };
      fetch();
    }
  }, [term]);

  return (
    <StyledContainer>
      <StyledModelContainer color={color}>
        <StyledModelHeaderContainer>
          <StyledHeaderTop>
            <ShortHeader>{term}</ShortHeader>
          </StyledHeaderTop>
          <StyledHeaderBot>
            <div className="word">Word</div>
            <div className="word-partner">Similarity</div>
            <div className="word-partner">count</div>
          </StyledHeaderBot>
        </StyledModelHeaderContainer>
        <StyledKeywordList>
          {keywords.length > 0 ? (
            <>
              {keywords.map(
                (item: {
                  count: number;
                  similarity: number;
                  token: string;
                }): JSX.Element => (
                  <StyledKWContainer key={item.token}>
                    <PreviewKeyword
                      token={item.token}
                      similarity={item.similarity}
                      count={item.count}
                    />
                  </StyledKWContainer>
                )
              )}
            </>
          ) : (
            <>
              {arr.map((item: number) => (
                <StyledKWContainer key={item}>
                  <StyledKWButton color={color} />
                </StyledKWContainer>
              ))}
            </>
          )}
        </StyledKeywordList>
      </StyledModelContainer>
    </StyledContainer>
  );
};

const StyledKWContainer = styled.div`
  position: relative;
`;
const StyledKWButton = styled.div<{ color: string }>`
  cursor: pointer;
  width: 100%;
  height: 32px;
  border: none;

  background: ${({ color }) => color}25;
  border-radius: 21px;
  margin-bottom: 7px;
`;

const StyledContainer = styled.div`
  width: 100%;
  max-width: 220px;
  min-width: 220px;
  padding-top: 40px;
`;
const StyledModelContainer = styled.div<{ color: string }>`
  border-top: 5px solid ${({ color }) => color};
  background-color: ${({ color }) => color}20;
  margin-right: 20px;
  max-width: 200px;
  min-width: 200px;
  width: 100%;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;
const StyledModelHeaderContainer = styled.header`
  padding: 20px 20px 20px;
`;
const Header = styled.h1`
  text-transform: capitalize;
  font-family: 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 1.4rem;
  line-height: 26px;
  color: #172d3b85;
  width: 100%;
  max-width: 150px;
  text-align: left;
`;
const ShortHeader = styled(Header)`
  font-size: 1.4rem;
`;
const StyledHeaderTop = styled.div`
  cursor: default;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header {
    cursor: default;
    border: none;
    background-color: transparent;
  }

  img:highlighted {
    transform: scale(1.2);
  }
`;
const StyledHeaderBot = styled.div`
  cursor: default;
  display: flex;
  padding-top: 25px;
  justify-content: space-between;

  div {
    font-family: 'Helvetica Neue', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 0.9rem;
    line-height: 11px;
    text-align: right;
    letter-spacing: 0.08em;
    text-transform: capitalize;

    color: rgba(23, 45, 59, 0.4);
  }
`;

const StyledKeywordList = styled.div`
  margin: 0 11px;
`;

export default PreviewSearchedItem;
