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

  // Перевірка токена при завантаженні
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      verifyToken(token);
    }
  }, []);

  // Перевірка токена на бекенді
  const verifyToken = async (token) => {
    try {
      const response = await axios.post(`${API_URL}/user/verify-token`, { token });
      if (response.data?.user) {
        setAccount(response.data.user.metaMaskAddress);
      }
    } catch (error) {
      console.error("Token verification failed:", error.response?.data || error.message);
      localStorage.removeItem('jwt'); // Видаляємо некоректний токен
    }
  };

  // Підключення до MetaMask
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

  // Слухач змін у MetaMask (якщо користувач змінює акаунт або від'єднується)
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          // Якщо акаунт змінився на порожній або користувач вийшов
          setAccount(null);
          localStorage.removeItem('jwt'); // Видаляємо токен з localStorage
        } else {
          setAccount(accounts[0]); // Оновлення адреси користувача, якщо змінився акаунт
        }
      });

      window.ethereum.on('chainChanged', (chainId) => {
        // Реакція на зміну мережі (не обов'язково, але можна додати для контролю)
        console.log('Chain changed to: ', chainId);
      });
    }
  }, []);

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      {account ? (
  <a href={`/user/info`} className="meta-address">
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

// Функція для підключення користувача до бази даних
export const connectUserToDB = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/user/connect`, data);

    if (response.data?.token) {
      // Зберігаємо токен у localStorage
      localStorage.setItem('jwt', response.data.token);
      console.log('Token saved to localStorage:', response.data.token);
    }

    return response.data; // Повертаємо відповідь сервера
  } catch (error) {
    console.error("Error connecting user:", error.response?.data || error.message);
    throw error;
  }
};

export default Header;
