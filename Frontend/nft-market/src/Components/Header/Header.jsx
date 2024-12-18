import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './Header.css';
import LoginWindow from '../LoginWindow/LoginWindow';
import axios from 'axios';

const API_URL = 'http://localhost:3500'; // Замініть на ваш реальний бекенд URL

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [account, setAccount] = useState(null);
  const [showLoginWindow, setShowLoginWindow] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        // Виклик бекенду для реєстрації або логування користувача
        const response = await connectUserToDB({ metaMaskAddress: address });
        setMessage(response.message || "Action completed successfully.");
        setShowLoginWindow(true);
      } catch (err) {
        console.error("User rejected the request", err);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        {account ? (
          <a href={`/user/${account}`} className="meta-address">
            {`${account.slice(0, 6)}...${account.slice(-4)}`}
          </a>
        ) : (
          <button className="header-btn" onClick={connectWallet}>Connect</button>
        )}
        <a href="/create" className="create">Create NFT</a>
        <a href="/marketplace" className="market">Marketplace</a>
        <a href="/marketplace" className="about">About the platform</a>
        <span className='title-name'><a href="/">NFT-Market</a></span>
      </header>

      {showLoginWindow && (
        <LoginWindow
          message={message}
          userAddress={account}
          onClose={() => setShowLoginWindow(false)}
        />
      )}
    </>
  );
};

export const connectUserToDB = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/user/connect`, data);
    return response.data; // Відповідь сервера
  } catch (error) {
    console.error("Error connecting user:", error.response?.data || error.message);
    throw error;
  }
};

export default Header;
