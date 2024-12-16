import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { blockchainData } from '../../BlockchainData'; // Підключення даних з BlockchainData.js
import './UserNFTSlider.css'

const UserNFTSlider = ({ userAddress }) => {
  // Шукаємо дані користувача за його адресою
  const user = blockchainData.find(data => data.userAddress === userAddress);

  if (!user || user.nfts.length === 0) {
    return <p style={{ textAlign: "center", paddingLeft: "500px" }}>No NFTs found for this user.</p>;
  }

  return (
    <div className="Obhordka">
    <div className="slider-section">
      <h2 className="slider-title"> USER NFTs</h2>
      <div className="slider-wrapper">
        <Swiper
          spaceBetween={20}
          slidesPerView={1} // Тепер лише один слайд одночасно
          pagination={{ type: 'fraction' }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="slider-main"
        >
          {user.nfts.map((nft, index) => (
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
    </div>
  );
};

UserNFTSlider.propTypes = {
  userAddress: PropTypes.string.isRequired,  // Адреса користувача
};

export default UserNFTSlider;
