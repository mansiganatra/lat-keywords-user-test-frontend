import React, { useContext } from 'react';
import searchContext from '../../store/searchContext';

import xImage from '../../lib/x.png';
import xAltImage from '../../lib/x_alt.png';

const ShowTopTagItem = ({ tag, selectedId, handleSortModel }) => {
  const { deleteModel } = useContext(searchContext);
  const { tag_id, term } = tag;

  return (
    <div
      className={`history ${selectedId === tag_id && 'selected'}`}
      onClick={() => handleSortModel(tag_id, term)}
    >
      {term}
      <button className="img" onClick={e => deleteModel(e, tag_id)}>
        {selectedId === tag_id ? (
          <img src={xAltImage} alt="x" />
        ) : (
          <img src={xImage} alt="x" />
        )}
      </button>
    </div>
  );
};

export default ShowTopTagItem;
