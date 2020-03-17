import React from 'react';

const Keyword = ({ word }) => {
  const handleClick = e => {
    const message = {
      call: 'setDocumentListParams', // call
      args: [{ q: word[0] }] // arguments
    };
    window.parent.postMessage(message, '*'); // postMessage() with message and origin
  };

  return (
    <>
      <div className="kw-container" onClick={handleClick}>
        <div className="result-kw-item list-item">
          <div className="text">{word[0]}</div>
          <div className="freq">{word[1]}</div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Keyword;
