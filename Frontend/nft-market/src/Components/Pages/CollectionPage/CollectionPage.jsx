import { useState, useEffect } from 'react';
import Header from '../../Header/Header';
import CollectionInfo from './Components/CollectionInfo';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CollectionPage = () => {
  const { collectionId } = useParams();
  console.log('Collection ID:', collectionId);  // Перевірка ID в консолі
  
  
  // Стани для даних та помилок
  const [collection, setCollection] = useState(null);
  const [error, setError] = useState(null);

  // Виконуємо запит до API
  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/collections/${collectionId}`);
        setCollection(response.data); // Зберігаємо дані в стейті
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
    return <p>Loading...</p>; // Показуємо індикатор завантаження, поки дані не прийшли
  }

  return (
    <>
      <Header />
      <CollectionInfo collection={collection} />
    </>
  );
};

export default CollectionPage;
