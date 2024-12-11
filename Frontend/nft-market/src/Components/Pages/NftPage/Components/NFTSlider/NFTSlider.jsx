import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import './NFTSlider.css';

const NFTSlider = ({ collectionNFTs }) => {
  return (
    <div className="slider-section">
      <h2 className="slider-title">MORE FROM THIS COLLECTION</h2>
      <div className="slider-wrapper">
        <Swiper
          spaceBetween={20}
          slidesPerView={1} // Тепер лише один слайд одночасно
          pagination={{ type: 'fraction' }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="slider-main"
        >
          {collectionNFTs.map((nft, index) => (
            <SwiperSlide key={index}>
              {/* Додаємо посилання на сторінку цього NFT */}
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
  collectionNFTs: PropTypes.array.isRequired,  // масив для нфт колекції
};

export default NFTSlider;
