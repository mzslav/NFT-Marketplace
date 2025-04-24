import PropTypes from "prop-types"; 
import '../../../MarketPage/Components/Card/Card.css'
import '../PreviewCard/PreviewCard.css'

const PreviewCard = ({ title, price, imageUrl }) => {

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate); 

  return (
    <div className="PreviewCard">
      <h2 className="preview-title">Preview</h2> 
      <div className="card">
        <div className="card-image-wrapper">
          <img
            src={imageUrl}  
            alt="NFT"
            className="card-image"
          />
        </div>
        <div className="card-content">
          <div className="card-author">author</div>
          <h3 className="card-title">{title}</h3>
        </div>
        <div className="card-background">
          <div className="release-section">
            <p className="release-text">Release</p>
            <div className="card-date">
              <p>{formattedDate}</p> 
            </div>
          </div>
          <div className="price-section">
            <p className="price-text">Price</p>
            <div className="card-price">
              <p>{price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

PreviewCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,  
};

export default PreviewCard;
