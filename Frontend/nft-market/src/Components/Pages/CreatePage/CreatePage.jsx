import Header from '../../Header/Header';
import InputBlock from './Components/InputBlock/InputBlock';
import { useEffect, useState } from 'react';

const Create = () => {
  const [userAddress, setUserAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Отримуємо JWT токен з localStorage
    const token = localStorage.getItem('jwt');

    if (!token) {
      // Якщо токен не знайдений, перенаправити користувача на сторінку логіну
      window.location.href = '/marketplace';
      return;
    }

    // Декодування або отримання адреси з токена (приклад, залежить від вашої логіки бекенду)
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Декодуємо payload з токена
      setUserAddress(payload.metaMaskAddress); // Припускаємо, що адреса знаходиться тут
    } catch (error) {
      console.error('Error decoding token:', error);
    } finally {
      setLoading(false); // Завершити завантаження
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <InputBlock userAddress={userAddress} />
    </>
  );
};

export default Create;
