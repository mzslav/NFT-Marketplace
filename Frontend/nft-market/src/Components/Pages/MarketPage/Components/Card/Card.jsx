import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; 
import "./Card.css";

const Card = ({ title, owner, releaseDate, price, imageUrl, id }) => {
  const navigate = useNavigate();

const handleMintClick = () => {
  navigate(`/nft/${id}`); 
};


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
        <div className="card-author">{owner}</div>
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
      <button className="go-try-btn" onClick={handleMintClick}>
        Mint Now
      </button>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Card;
