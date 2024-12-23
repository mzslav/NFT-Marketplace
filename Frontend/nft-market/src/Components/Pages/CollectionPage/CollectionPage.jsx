import { useState, useEffect } from 'react';
import Header from '../../Header/Header';
import CollectionInfo from './Components/CollectionInfo';
import NFTSlider from './Components/NFTSlider/NFTSliderCollection' 
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CollectionPage = () => {
  const { collectionId } = useParams();
  console.log('Collection ID:', collectionId);  // Перевірка ID в консолі
  
  // Стани для даних та помилок
  const [collection, setCollection] = useState(null);
  const [error, setError] = useState(null);

  // Виконуємо запит до API для колекції
  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/collections/${collectionId}`);
        setCollection(response.data); // Зберігаємо дані колекції в стейті
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Collection not found!');
      }
    };

    fetchCollectionData();
  }, [collectionId]); // Викликаємо ефект, якщо collectionId змінюється

  if (error) {
    return <p>{error}</p>; // Якщо є помилка, показуємо повідомлення
  }

  if (!collection) {
    return <p>Loading...</p>; // Показуємо індикатор завантаження
  }

  return (
    <>
      <Header />
      <CollectionInfo collection={collection} />
      {/* Передаємо масив nfts у компонент слайдера */}
      <NFTSlider collectionNFTs={collection.nfts} />
    </>
  );
};

export default CollectionPage;
