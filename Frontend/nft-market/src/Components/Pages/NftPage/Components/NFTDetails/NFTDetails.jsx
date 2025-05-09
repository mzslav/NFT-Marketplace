import PropTypes from "prop-types";
import { Link } from "react-router-dom"; 
import "./NFTDetails.css";

const NFTDetails = ({
  title,
  price,
  imageUrl,
  owner,
  creator,
  description,
  isAuction,
  onBuyClick,
  collectionName,
  onPriceChange,
  collectionId,
}) => {
  return (
    <div className="nft-details-container">

      <div className="nft-details-upper">
        <div className="nft-image-wrapper">
          <img src={imageUrl} alt={title} className="nft-image" />
        </div>
        <div className="nft-info">
      
          <p className="collection-name">
            <Link to={`/collections/${collectionId}`} style={{ textDecoration: "none", color: "inherit" }}>
              {collectionName}
            </Link>
          </p>
          <h1 className="nft-title">{title}</h1>
          <div className="meta-info">
            <div className="creator">
              <p className="label">Creator:</p>
              <p className="value">{creator}</p>
            </div>
            <div className="owner">
              <p className="label">Current Owner:</p>
              <p className="value">{owner || creator}</p>
            </div>
          </div>
          <div className="price-section-b">
            <p className="label">{isAuction ? "Current bet:" : "Price:"}</p>
            <p className="price">{price || "N/A"}</p>
          </div>
          <div className="separator"></div>

      
          {isAuction && (
            <div className="input-container">
              <input
                type="text"
                placeholder="Enter your bid"
                className="bid-input"
                onChange={onPriceChange}
              />
            </div>
          )}

          <div className="button-container-b">
            <button className="buy-now-button" onClick={onBuyClick}>
              {isAuction ? "Place Bid" : "Buy Now"}
            </button>
          </div>
        </div>
      </div>
      <div className="bottom-separator"></div>

 
      <div className="description-section">
        <h2 className="description-title">Description:</h2>
        <p className="description-text">{description || "No description available."}</p>
      </div>
    </div>
  );
};

NFTDetails.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  description: PropTypes.string,
  isAuction: PropTypes.bool,
  onBuyClick: PropTypes.func.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.string.isRequired, 
  onPriceChange: PropTypes.func.isRequired,
};

export default NFTDetails;
