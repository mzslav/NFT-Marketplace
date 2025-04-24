import Header from '../../Header/Header';
import InputBlock from './Components/InputBlock/InputBlock';
import { useEffect, useState } from 'react';

const Create = () => {
  const [userAddress, setUserAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem('jwt');

    if (!token) {
    
      window.location.href = '/marketplace';
      return;
    }


    try {
      const payload = JSON.parse(atob(token.split('.')[1])); 
      setUserAddress(payload.metaMaskAddress); 
    } catch (error) {
      console.error('Error decoding token:', error);
    } finally {
      setLoading(false);
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
