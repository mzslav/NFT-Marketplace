import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NFTDetails from "./Components/NFTDetails/NFTDetails";
import NFTSlider from "./Components/NFTSlider/NFTSlider";
import Header from "../../Header/Header";

const NFTPage = () => {
  const { id } = useParams(); // Отримуємо ID з URL
  const [nft, setNft] = useState(null); // Стейт для NFT-даних
  const [loading, setLoading] = useState(true); // Стейт для завантаження
  const [error, setError] = useState(null); // Стейт для помилок

  // Функція для отримання даних про NFT
  useEffect(() => {
    const fetchNft = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/nft/${id}`); // Запит на сервер
        if (response.data.success) {
          setNft(response.data.data); // Зберігаємо дані NFT у стейт
        } else {
          setError("NFT not found");
        }
      } finally {
        setLoading(false); // Завантаження завершено
      }
    };

    fetchNft();
  }, [id]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  }

  // Якщо дані отримано, відображаємо сторінку
  const handleBuyClick = () => {
    alert(
      `You have ${
        nft.NftStatus === "on auction" ? "placed a bid" : "bought"
      } on ${nft.title}!`
    );
  };

  // Фільтруємо колекцію для слайдера
  const filteredCollectionNFTs = []; // Зробіть окремий запит для колекції, якщо потрібно

  return (
    <div className="nft-page">
      <Header />
      <NFTDetails
        title={nft.title}
        price={`${nft.price} ETH`}
        imageUrl={nft.imageUrl}
        owner={nft.owner}
        creator={nft.creatorId}
        description={nft.description}
        isAuction={nft.NftStatus === "on auction"}
        onBuyClick={handleBuyClick}
        collectionName={nft.collectionName || "Unknown"}
      />
      <NFTSlider
        collectionNFTs={filteredCollectionNFTs}
        currentNFTCollection={nft.collectionName || "Unknown"}
      />
    </div>
  );
};

export default NFTPage;
