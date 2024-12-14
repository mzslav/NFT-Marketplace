import Header from '../../Header/Header';
import ProfileStats from '../UserProfilePage/Components/ProfileStats/ProfileStats';
import { useParams } from 'react-router-dom';
import UserNFTSlider from './Components/UserNFTSlider/UserNFTSlider';

const ProfilePage = () => {
  const { id } = useParams(); // Отримуємо id користувача з URL

  return (
    <>
      <Header />
      <ProfileStats userAddress={id} />
      <UserNFTSlider userAddress={id} />

    </>
  );
};

export default ProfilePage;
