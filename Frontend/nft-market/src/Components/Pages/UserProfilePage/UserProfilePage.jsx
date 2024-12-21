import Header from '../../Header/Header';
import ProfileStats from '../UserProfilePage/Components/ProfileStats/ProfileStats';
import { useEffect, useState } from 'react';
import UserNFTSlider from './Components/UserNFTSlider/UserNFTSlider';

const ProfilePage = () => {
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

    // Отправляємо запит на бекенд для отримання профілю користувача
    fetch('http://localhost:3500/user/info', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        setUserAddress(data.data.userAddress);
      } else {
        // Обробка помилки, якщо не вдалося отримати дані
        console.error('Error fetching user data:', data.message);
      }
    })
    .finally(() => setLoading(false)); // Завершити завантаження
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <ProfileStats userAddress={userAddress} />
      <UserNFTSlider userAddress={userAddress} />
    </>
  );
};

export default ProfilePage;
