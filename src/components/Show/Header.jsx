import React from 'react';
import moreInfo from '../../lib/more_info.png';

const Header = () => (
  <>
    <div className="header-message">
      <div className="header">
        <h1>Find words associated with your search term</h1>
        <div>
          <img src={moreInfo} alt="more info" />
        </div>
      </div>
      <div className="subheader">
        <p>
          Try searching keywords related to each project like “politics” or
          “money.”
        </p>
      </div>
    </div>
  </>
);

export default Header;
