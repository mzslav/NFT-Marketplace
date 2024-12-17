import { useState, useEffect } from "react";
import Card from "../Card/Card";
import "./CardList.css";

const CardList = () => {
  const [cards, setCards] = useState([]); // Стейт для карток
  const [visibleCards, setVisibleCards] = useState(6); // Початково 6 карток
  const [loading, setLoading] = useState(true); // Стейт для індикатора завантаження

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await fetch("http://localhost:3500/marketplace"); // Ваш API endpoint
        const data = await response.json();
        if (data.success) {
          setCards(data.data); // Зберігаємо отримані NFT
          setLoading(false); // Завантаження завершено
        } else {
          console.error("Failed to fetch NFTs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      }
    };

    fetchNFTs();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setVisibleCards(screenWidth >= 1920 ? 8 : 6);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadMoreCards = () => {
    setVisibleCards(visibleCards + 6);
  };

  if (loading) {
    return <div>Loading NFTs...</div>;
  }

  return (
    <div className="card-list">
      {cards.slice(0, visibleCards).map((card, index) => (
        <Card
          key={index}
          id={card._id}
          title={card.title}
          owner={card.creatorId?.username || "Unknown"} // Відображаємо ім'я творця
          releaseDate={new Date(card.createdAt).toLocaleDateString()} // Форматуємо дату
          price={`${card.price} ETH`}
          imageUrl={card.imageUrl}
        />
      ))}

      {visibleCards < cards.length && (
        <div className="button-container">
          <button onClick={loadMoreCards} className="load-more-btn">
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default CardList;
