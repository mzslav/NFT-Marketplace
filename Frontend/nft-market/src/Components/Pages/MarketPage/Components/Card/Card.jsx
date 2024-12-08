import PropTypes from "prop-types"; // Імпортуємо PropTypes для валідації пропсів
import "./Card.css";

const Card = ({ title, author, releaseDate, price, imageUrl }) => {
  return (
    <div className="card">
      <div className="card-image-wrapper">
        <img
          src={imageUrl}
          alt="NFT"
          className="card-image"
        />
      </div>
      <div className="card-content">
        <div className="card-author">{author}</div>
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-background">
        <div className="release-section">
          <p className="release-text">Release</p>
          <div className="card-date">
            <p>{releaseDate}</p>
          </div>
        </div>
        <div className="price-section">
          <p className="price-text">Price</p>
          <div className="card-price">
            <p>{price}</p>
          </div>
        </div>
      </div>
      {/* Кнопка "Go Try" з оновленим стилем */}
      <button className="go-try-btn">
        Mint Now
      </button>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default Card;
