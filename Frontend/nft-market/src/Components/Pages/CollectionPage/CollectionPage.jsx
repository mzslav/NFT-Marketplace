import { useState, useEffect } from 'react';
import Header from '../../Header/Header';
import CollectionInfo from './Components/CollectionInfo';
import NFTSlider from './Components/NFTSlider/NFTSliderCollection' 
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CollectionPage = () => {
  const { collectionId } = useParams();
  console.log('Collection ID:', collectionId);  
  

  const [collection, setCollection] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/collections/${collectionId}`);
        setCollection(response.data); 

      } catch (err) {
        setError('Collection not found!');
      }
    };

    fetchCollectionData();
  }, [collectionId]); 

  if (error) {
    return <p>{error}</p>; 
  }

  if (!collection) {
    return <p>Loading...</p>; 
  }

  return (
    <>
      <Header />
      <CollectionInfo collection={collection} />
      <NFTSlider collectionNFTs={collection.nfts} />
    </>
  );
};

export default CollectionPage;
