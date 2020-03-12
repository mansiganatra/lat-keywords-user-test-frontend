import React from 'react';
import DocsetList from '../DocsetList';
import DownloadBtn from '../DownloadBtn';
import AppRoutes from '../../AppRoutes';

const index = ({ docset, saveToFile, getKeywords, removeKey, deleteModel }) => (
  <div className="search-content">
    <div className="left-content">
      <div className="docset-list">
        <DocsetList docset={docset} />
      </div>
      <div className="download-btn">
        <DownloadBtn saveToFile={saveToFile} />
      </div>
    </div>
    <div className="right-content">
      <AppRoutes
        docset={docset}
        saveToFile={saveToFile}
        getKeywords={getKeywords}
        removeKey={removeKey}
        deleteModel={deleteModel}
      />
    </div>
  </div>
);

export default index;
