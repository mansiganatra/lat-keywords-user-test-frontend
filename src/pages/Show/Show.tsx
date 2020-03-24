import React, { useContext } from 'react';
import searchContext from '../../store/searchContext';

import SearchResults from '../../components/Show/SearchResults';
import LoadingPage from '../../components/LoadingPage/LoadingPage';

const Show = (props: any): JSX.Element => {
  const { modelState } = useContext(searchContext);

  return (
    <section>
      {modelState.isSuccess ? (
        <SearchResults />
      ) : (
        <LoadingPage progress={modelState.lastProgress} />
      )}
    </section>
  );
};

export default Show;
