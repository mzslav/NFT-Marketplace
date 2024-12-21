import PropTypes from "prop-types";
import { useEffect, useState } from 'react';
import './ProfileStats.css';

const ProfileStats = ({ userAddress }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [avatar, setAvatar] = useState("https://www.webiconio.com/_upload/255/image_255.svg"); // дефолтне зображення

  useEffect(() => {
    if (!userAddress) return;

    // Запит на отримання профілю користувача за його адресою
    fetch(`http://localhost:3500/user/info`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success && data.data.userAddress === userAddress) {
        setUserProfile({
          name: data.data.username,
          address: data.data.userAddress,
          balance: data.data.totalBalance, // Тут потрібно буде коректно обробити баланс, якщо потрібно
          purchases: data.data.purchases,
          sales: data.data.sales,
          totalNFTs: data.data.totalNFTs,
        });
      }
    });
  }, [userAddress]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="glass">
      <div className="avatar-container">
        <label htmlFor="avatar-upload" className="avatar-label">
          <img 
            src={avatar} 
            alt="User Avatar" 
            className="avatar" 
          />
        </label>
        <input 
          type="file" 
          accept="image/*" 
          id="avatar-upload" 
          className="avatar-upload" 
          onChange={handleAvatarChange} 
        />
      </div>
      <h2 className="username">{userProfile.name}</h2>
      <div className="field-group">
        <div className="field">
          <span>Address:</span> {userProfile.address}
        </div>
        <div className="underline"></div>
        <div className="field">
          <span>Total Balance:</span> {userProfile.balance}
        </div>
        <div className="underline"></div>
      </div>
      <div className="stats-group">
        <div className="field">
          <span>Total NFTs:</span> {userProfile.totalNFTs}
        </div>
        <div className="underline"></div>
        <div className="field">
          <span>Sales:</span> {userProfile.sales}
        </div>
        <div className="underline"></div>
        <div className="field">
          <span>Purchases:</span> {userProfile.purchases}
        </div>
        <div className="underline"></div>
      </div>
    </div>
  );
};

ProfileStats.propTypes = {
  userAddress: PropTypes.string.isRequired,
};

export default ProfileStats;
