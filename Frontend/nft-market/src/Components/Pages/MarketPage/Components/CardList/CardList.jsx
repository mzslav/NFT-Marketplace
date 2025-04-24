import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import "./CardList.css";

const CardList = ({ sortParams }) => {
  const [cards, setCards] = useState([]); 
  const [visibleCards, setVisibleCards] = useState(6); 
  const [loading, setLoading] = useState(true);


  const buildUrl = () => {
    const baseUrl = "http://localhost:3500/marketplace";
    const queryParams = new URLSearchParams({
      ...(sortParams.category && { category: sortParams.category }), 
      ...(sortParams.sortOrder && { sortOrder: sortParams.sortOrder }), 
    }).toString();

    return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
  };

  useEffect(() => {
    const fetchNFTs = async () => {
      setLoading(true); 
      try {
        const url = buildUrl(); 
        const response = await fetch(url);
        const data = await response.json();
        if (data.success) {
          setCards(data.data); 
        } else {
          console.error("Failed to fetch NFTs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [sortParams]);

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


  const filteredCards = cards
    .filter((card) => {
      if (sortParams.category === "isAuctioned:true") {
        return card.isAuctioned === true;
      } else if (sortParams.category === "isAuctioned:false") {
        return card.isAuctioned === false;
      }
      return true; 
    })
    .filter((card) => {
      if (sortParams.author && card.creatorId?.username) {
        return card.creatorId.username
          .toLowerCase()
          .includes(sortParams.author.toLowerCase());
      }
      return true; 
    })
    .filter((card) => {
      if (sortParams.price && card.price) {
        return card.price.toString().includes(sortParams.price);
      }
      return true;
    });

  
  const sortedCards = filteredCards.sort((a, b) => {
    if (sortParams.sortOrder === "asc") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortParams.sortOrder === "desc") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0; 
  });

  return (
    <div className="card-list">
      {sortedCards.slice(0, visibleCards).map((card, index) => (
        <Card
          key={index}
          id={card._id}
          title={card.title}
          owner={card.creatorId?.username || "Unknown"} 
          releaseDate={new Date(card.createdAt).toLocaleDateString()} 
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
