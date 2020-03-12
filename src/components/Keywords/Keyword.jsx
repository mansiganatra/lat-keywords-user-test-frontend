import React from 'react';

const Keyword = ({ word }) => {
  return (
    <div className="kw-container">
      <div className="result-kw-item list-item">
        <div className="text">{word[0]}</div>
        <div className="freq">{word[1]}</div>
      </div>
    </div>
  );
};

export default Keyword;
