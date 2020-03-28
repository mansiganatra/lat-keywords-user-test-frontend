import styled from 'styled-components';

// loadingpage
export const LoadingPageContainer = styled.div`
  padding-top: 75px;
  width: 100%;
  max-width: 620px;
  margin: 0 auto;
`;
export const StyledTopSection = styled.section`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-right: 50px;
  @media (max-width: 700px) {
    margin-right: 0;
  }
`;
export const StyledImgContainer = styled.div`
  padding-right: 60px;
`;
export const StyledHeader = styled.h1`
  font-family: 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 2.1rem;
  line-height: 26px;
  text-transform: capitalize;

  color: #172d3b;
`;
export const StyledLoadingBar = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 35px;
  width: 100%;
  max-width: 620px;
  height: 7px;

  background: #dfe2e5;
`;
export const StyledLoadingFiller = styled.div<{ fraction: number }>`
  background: #43d0ce;
  height: 100%;
  width: ${({ fraction }) => (fraction ? fraction * 100 : 0)}%;
`;

// error
export const ErrorContainer = styled.div`
  display: flex;
  background: #ffe9ea;
  padding: 40px 0 40px 40px;
  h1 {
    font-family: 'Archivo', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 1.7remx;
    line-height: 18px;
    padding-right: 10px;

    color: #fc3636;
  }
  p {
    font-family: 'Archivo', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 1.7rem;
    line-height: 18px;

    color: #fc3636;
  }
`;
export const ErrorImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 10px;

  img {
    width: inherit;
  }
`;

// loadingsuccess
export const StyledLoadComplete = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 75px;
  padding-bottom: 25px;
  background-color: #3e5372;
`;
export const StyledLoadingHeader = styled(StyledHeader)`
  font-family: 'Helvetica Neue', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 2.1rem;
  line-height: 26px;
  text-transform: capitalize;

  color: #ffffff;
`;
export const StyledSubHeader = styled.p`
  font-family: 'Archivo', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 1.1rem;
  line-height: 125%;
  /* or 14px */

  text-align: center;
  /* or 130% */
  color: #a0afc7;
`;
export const StyledImgComplete = styled.div`
  margin-bottom: 30px;
  position: relative;

  div {
    position: absolute;
    left: -70px;
    top: -22px;
  }
`;
export const StyledHeaderSection = styled.header`
  width: 100%;
  max-width: 300px;
`;
export const StyledLoadHeader = styled(StyledHeaderSection)`
  text-align: center;

  h1 {
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 10px;
  }
`;
