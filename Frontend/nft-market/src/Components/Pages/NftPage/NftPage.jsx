import { useParams } from "react-router-dom";
import NFTDetails from "./Components/NFTDetails/NFTDetails";
import NFTSlider from "./Components/NFTSlider/NFTSlider";
import { cardData } from "../MarketPage/Components/Data";
import Header from "../../Header/Header";

const NFTPage = () => {
  const { id } = useParams();

  // Шукаємо відповідний об'єкт NFT у cardData за ID
  const nft = cardData.find((item) => item.id === parseInt(id)); // Пошук по id

  // Якщо об'єкт не знайдено, показуємо повідомлення
  if (!nft) {
    return <p style={{ textAlign: "center" }}>NFT not found</p>;
  }

  // Обробка натискання кнопки
  const handleBuyClick = () => {
    alert(
      `You have ${nft.nftStatus === "on auction" ? "placed a bid" : "bought"} on ${nft.title}!`
    );
  };

  // Фільтруємо поточне NFT, щоб не показувати його на слайдері
  const filteredCollectionNFTs = cardData.filter((item) => item.collectionName === nft.collectionName && item.id !== nft.id);

  return (
    <div className="nft-page">
      <Header />
      <NFTDetails
        title={nft.title}
        price={nft.price}
        imageUrl={nft.imageUrl}
        owner={nft.owner}
        creator={nft.creator} // Якщо є
        description={nft.description}
        isAuction={nft.nftStatus === "on auction"} // Перевіряємо статус аукціону
        onBuyClick={handleBuyClick}
        collectionName={nft.collectionName} // Якщо є
      />
      {/* Передаємо колекцію NFT до слайдера */}
      <NFTSlider collectionNFTs={filteredCollectionNFTs} currentNFTCollection={nft.collectionName} />
    </div>
  );
};

export default NFTPage;
