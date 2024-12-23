import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NFTDetails from "./Components/NFTDetails/NFTDetails";
import NFTSlider from "./Components/NFTSlider/NFTSlider";
import Header from "../../Header/Header";

const NFTPage = () => {
  const { id } = useParams(); // Отримуємо ID з URL
  const [nft, setNft] = useState(null); // Стейт для NFT-даних
  const [collectionNFTs, setCollectionNFTs] = useState([]); // Стейт для NFT у колекції
  const [loading, setLoading] = useState(true); // Стейт для завантаження
  const [error, setError] = useState(null); // Стейт для помилок

  useEffect(() => {
    const fetchNftAndCollection = async () => {
      try {
        const nftResponse = await axios.get(`http://localhost:3500/nft/${id}`); // Запит на NFT
        console.log("NFT Response:", nftResponse.data); // Перевіряємо, що приходить
        if (nftResponse.data.success) {
          const nftData = nftResponse.data.data;
          setNft(nftData); // Зберігаємо дані NFT у стейт

          // Завантажуємо NFT з колекції
          const collectionResponse = await axios.get(
            `http://localhost:3500/collections/${nftData.collectionId}`
          );
          console.log("Collection Response:", collectionResponse.data); // Перевіряємо колекцію
          if (collectionResponse.data) {
            setCollectionNFTs(collectionResponse.data.nfts);
          }
        } else {
          setError("NFT not found");
        }
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false); // Завантаження завершено
      }
    };

    fetchNftAndCollection();
  }, [id]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  }

  const handleBuyClick = () => {
    alert(
      `You have ${
        nft.NftStatus === "on auction" ? "placed a bid" : "bought"
      } on ${nft.title}!`
    );
  };

  return (
    <div className="nft-page">
      <Header />
      <NFTDetails
        title={nft.title}
        price={`${nft.price} ETH`}
        imageUrl={nft.imageUrl}
        owner={nft.owner ? nft.owner.username : "Unknown"}
        creator={nft.creatorId ? nft.creatorId.username : "Unknown"}
        description={nft.description}
        isAuction={nft.NftStatus === "on auction"}
        onBuyClick={handleBuyClick}
        collectionName={nft.collectionName || "Unknown"}
        collectionId={nft.collectionId}
      />

      <NFTSlider
        collectionNFTs={collectionNFTs}
        currentCollectionId={nft.collectionId} // Передаємо ID колекції
      />
    </div>
  );
};

export default NFTPage;