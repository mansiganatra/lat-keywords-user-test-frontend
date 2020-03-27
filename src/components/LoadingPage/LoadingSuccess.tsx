import React from 'react';

import searchBarSuccess from '../../lib/images/searchbar-success.png';
import loadingPointer from '../../lib/images/loading-pointer.png';
import {
  StyledLoadComplete,
  StyledImgComplete,
  StyledSubHeader,
  StyledLoadHeader,
  StyledLoadingHeader
} from './LoadingStyles';

interface LoadingSuccessProps {}

const LoadingSuccess = ({}: LoadingSuccessProps): JSX.Element => {
  return (
    <StyledLoadComplete>
      <StyledImgComplete>
        <div>
          <img src={loadingPointer} alt="" />
        </div>
        <img src={searchBarSuccess} alt="" />
      </StyledImgComplete>
      <StyledLoadHeader>
        <StyledLoadingHeader>Start Searching Now</StyledLoadingHeader>
        <StyledSubHeader>
          Your document set is now ready to be sorted by the Associator. Enter
          your search term into the search bar above to see a list of related
          words.
        </StyledSubHeader>
      </StyledLoadHeader>
    </StyledLoadComplete>
  );
};

export default LoadingSuccess;
