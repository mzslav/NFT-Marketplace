import Header from '../../Header/Header';
import ProfileStats from '../UserProfilePage/Components/ProfileStats/ProfileStats';
import { useParams } from 'react-router-dom';
import UserNFTSlider from './Components/UserNFTSlider/UserNFTSlider';

const ProfilePage = () => {
  const { metaMaskAddress } = useParams(); // Отримуємо id користувача з URL

  return (
    <>
      <Header />
      <ProfileStats userAddress={metaMaskAddress} />
      <UserNFTSlider userAddress={metaMaskAddress} />

    </>
  );
};

export default ProfilePage;
