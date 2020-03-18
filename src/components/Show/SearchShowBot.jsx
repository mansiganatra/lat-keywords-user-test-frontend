import React, { useContext } from 'react';
import searchContext from '../../store/searchContext';
import Model from '../Models/Model';

const SearchShowBot = () => {
  const { docset } = useContext(searchContext);
  const { models } = docset;
  return (
    <section className="search-show-bot">
      <div className="model-list">
        {models.map((model, i) => (
          <Model key={i} model={model} />
        ))}
      </div>
    </section>
  );
};

export default SearchShowBot;
