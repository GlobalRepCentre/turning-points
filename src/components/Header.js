import React from 'react';

function Header() {
  return (
    <header>
      <h1><span>Turning</span> Points</h1>
      <p>is a series of <span className="highlight"><span>8 short films</span></span> dealing with addiction in Yellowknife, directed by the storytellers themselves.</p>
      <button className="highlight"><span>play</span></button>
      <button role="navigation" className="highlight"><span>about</span></button>
    </header> 
  );
}

export default Header;