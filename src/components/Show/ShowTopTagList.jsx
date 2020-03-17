import React, { useContext, useState } from 'react';
import searchContext from '../../store/searchContext';

import ShowTopTagItem from './ShowTopTagItem';

const ShowTopTagList = () => {
  const [selectedId, setSelectedId] = useState(null);
  const { docset, sortModels } = useContext(searchContext);

  const handleSortModel = (id, term) => {
    setSelectedId(id);
    sortModels(id, term);
  };

  return (
    <div className="history-list">
      {docset.search_history.map(tag => (
        <ShowTopTagItem
          key={tag.tag_id}
          tag={tag}
          handleSortModel={handleSortModel}
          selectedId={selectedId}
        />
      ))}
    </div>
  );
};

export default ShowTopTagList;
