import { useParams } from "react-router-dom";
import NFTDetails from "./Components/NFTDetails/NFTDetails";
import NFTSlider from "./Components/NFTSlider/NFTSlider";
import { nftData } from "./Components/nftData";
import Header from "../../Header/Header";

const NFTPage = () => {
  const { id } = useParams(); // Отримуємо параметр `id` із URL

  // Шукаємо відповідний об'єкт NFT у базі за ID
  const nft = nftData.find((item) => item.id === id);

  // Якщо об'єкт не знайдено, показуємо повідомлення
  if (!nft) {
    return <p style={{ textAlign: "center" }}>NFT not found</p>;
  }

  // Обробка натискання кнопки
  const handleBuyClick = () => {
    alert(
      `You have ${nft.isAuction ? "placed a bid" : "bought"} on ${nft.title}!`
    );
  };

  // Фільтруємо поточне NFT, щоб не показувати його на слайдері
  const filteredCollectionNFTs = nftData.filter((item) => item.id !== id);

  return (
    
    <div className="nft-page">
        <Header />
      <NFTDetails
        title={nft.title}
        price={nft.price}
        imageUrl={nft.imageUrl}
        owner={nft.owner}
        creator={nft.creator}
        description={nft.description}
        isAuction={nft.isAuction}
        onBuyClick={handleBuyClick}
        collectionName={nft.collectionName} // якщо є
        collectionNFTs={filteredCollectionNFTs} // передаємо відфільтровані NFT
      />
      <NFTSlider collectionNFTs={filteredCollectionNFTs} /> {/* Слайдер з відфільтрованими NFT */}
    </div>
  );
};

export default NFTPage;
