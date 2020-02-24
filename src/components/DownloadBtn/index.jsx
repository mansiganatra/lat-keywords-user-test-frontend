import React from 'react';
import './DownloadBtn.css';

const index = ({ saveToFile }) => {
  return (
    <button className="download-btn" onClick={saveToFile}>
      Download JSON
    </button>
  );
};

export default index;
