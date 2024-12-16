import { useState, useEffect } from "react";
import Card from "../Card/Card";
import { cardData } from "../Data"; // Імпортуємо дані з Data.js
import "./CardList.css";

const CardList = () => {
  // Стейт для відображення карток
  const [visibleCards, setVisibleCards] = useState(6); // Початково 6 карток

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1920) {
        setVisibleCards(8);
      } else {
        setVisibleCards(6); // Для менших екранів встановлюємо 6 карток
      }
    };

    window.addEventListener('resize', handleResize);

    // Оновлюємо значення при першому рендері
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadMoreCards = () => {
    setVisibleCards(visibleCards + 6);
  };

  return (
    <div className="card-list">
      {cardData.slice(0, visibleCards).map((card, index) => (
        <Card
          key={index}
          id={card.id} // Передача id кожної картки для використання в маршруті
          title={card.title}
          owner={card.owner}
          releaseDate={card.releaseDate}
          price={card.price}
          imageUrl={card.imageUrl}
        />
      ))}

      {/* Кнопка для завантаження наступних карток */}
      {visibleCards < cardData.length && (
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
