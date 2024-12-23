import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import "./CardList.css";

const CardList = ({ sortParams }) => {
  const [cards, setCards] = useState([]); // Стейт для карток
  const [visibleCards, setVisibleCards] = useState(6); // Початково 6 карток
  const [loading, setLoading] = useState(true); // Стейт для індикатора завантаження

  // Функція для формування динамічного URL
  const buildUrl = () => {
    const baseUrl = "http://localhost:3500/marketplace";
    const queryParams = new URLSearchParams({
      ...(sortParams.category && { category: sortParams.category }), // Додаємо категорію, якщо вона задана
      ...(sortParams.sortOrder && { sortOrder: sortParams.sortOrder }), // Додаємо сортування, якщо задане
    }).toString();

    return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
  };

  useEffect(() => {
    const fetchNFTs = async () => {
      setLoading(true); // Показуємо індикатор завантаження
      try {
        const url = buildUrl(); // Генеруємо URL
        const response = await fetch(url);
        const data = await response.json();
        if (data.success) {
          setCards(data.data); // Зберігаємо отримані NFT
        } else {
          console.error("Failed to fetch NFTs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      } finally {
        setLoading(false); // Завантаження завершено
      }
    };

    fetchNFTs();
  }, [sortParams]); // Викликаємо запит при зміні параметрів сортування чи категорії

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

  // Фільтруємо картки за активними параметрами пошуку
  const filteredCards = cards
    .filter((card) => {
      if (sortParams.category === "isAuctioned:true") {
        return card.isAuctioned === true;
      } else if (sortParams.category === "isAuctioned:false") {
        return card.isAuctioned === false;
      }
      return true; // Якщо категорія не вказана, всі картки
    })
    .filter((card) => {
      if (sortParams.author && card.creatorId?.username) {
        return card.creatorId.username
          .toLowerCase()
          .includes(sortParams.author.toLowerCase());
      }
      return true; // Якщо автор не вказаний, всі картки
    })
    .filter((card) => {
      if (sortParams.price && card.price) {
        return card.price.toString().includes(sortParams.price);
      }
      return true; // Якщо ціна не вказана, всі картки
    });

  // Сортуємо картки за часом створення, якщо вказано сортування
  const sortedCards = filteredCards.sort((a, b) => {
    if (sortParams.sortOrder === "asc") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortParams.sortOrder === "desc") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0; // Якщо сортування не задане, залишаємо як є
  });

  return (
    <div className="card-list">
      {sortedCards.slice(0, visibleCards).map((card, index) => (
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

      {visibleCards < sortedCards.length && (
        <div className="button-container">
          <button onClick={loadMoreCards} className="load-more-btn">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

CardList.propTypes = {
  sortParams: PropTypes.shape({
    category: PropTypes.string,
    sortOrder: PropTypes.string,
    author: PropTypes.string,
    price: PropTypes.string,
  }).isRequired,
};

export default CardList;
