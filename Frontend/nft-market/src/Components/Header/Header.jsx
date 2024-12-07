import { useEffect, useState } from 'react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Використовуємо useEffect для додавання обробника прокручування
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Додаємо клас при прокручуванні
      } else {
        setIsScrolled(false); // Прибираємо клас, коли прокручено менше ніж 50px
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Прибираємо обробник події при відмонтованому компоненті
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <button className="header-btn">Connect</button>
      <a href="/marketplace/create" className="create">Create NFT</a>
      <a href="/marketplace" className="market">Marketplace</a>
      <a href="/marketplace" className="about">About the platform</a>
      <span className='title-name'><a href="/">NFT-Market</a></span>
    </header>
  );
};

export default Header;
