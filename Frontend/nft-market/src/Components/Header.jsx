import React from 'react';
import './styles/Header.css';

const Header = () => {
    return (
      <header className="header">
        <button className="header-btn">Connect</button>
          <a href="/marketplace" className="create">Create NFT</a>
          <a href="/marketplace" className="market">Marketplace</a>
          <a href="/marketplace" className="about">About the platform</a>
          <span className='title-name'>NFT-Market</span>
      </header>
    );
  };
  
  export default Header;