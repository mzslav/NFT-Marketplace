import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import './NFTSlider.css';

const NFTSlider = ({ collectionNFTs }) => {
  // Перевірка наявності даних
  if (!collectionNFTs || !Array.isArray(collectionNFTs)) {
    return (
      <p style={{ textAlign: "center", color: "red" }}>
        Error: Collection NFTs data is invalid or missing.
      </p>
    );
  }

  // Якщо дані порожні
  if (collectionNFTs.length === 0) {
    return (
      <p style={{ textAlign: "center" }}>
        No NFTs found in this collection.
      </p>
    );
  }

  return (
    <div className="slider-section">
      <h2 className="slider-title">MORE FROM THIS COLLECTION</h2>
      <div className="slider-wrapper">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ type: 'fraction' }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="slider-main"
        >
          {collectionNFTs.map((nft, index) => (
            <SwiperSlide key={index}>
              <a href={`/nft/${nft.id}`} className="slider-link">
                <img src={nft.imageUrl} alt={nft.title} className="slider-image" />
                <h3 className="slider-item-title">{nft.title}</h3>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

NFTSlider.propTypes = {
  collectionNFTs: PropTypes.array.isRequired,  // масив для NFT колекції
};

export default NFTSlider;
