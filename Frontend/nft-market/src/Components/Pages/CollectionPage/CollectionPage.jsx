import Header from '../../Header/Header';
import CollectionInfo from './Components/CollectionInfo';
import { useParams } from 'react-router-dom';
import collectionData from '../CollectionPage/CollectionData';

const CollectionPage = () => {
  const { collectionId } = useParams(); 

  // Отримуємо дані про колекцію за ID
  const collection = collectionData[collectionId];

  if (!collection) {
    return <p>Collection not found!</p>;
  }

  return (
    <>
      <Header />
      <CollectionInfo collection={collection} />
      
    </>
  );
};

export default CollectionPage;
