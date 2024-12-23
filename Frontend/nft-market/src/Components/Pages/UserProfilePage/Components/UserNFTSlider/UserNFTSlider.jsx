import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import './UserNFTSlider.css';
import { useEffect, useState } from 'react';

const UserNFTSlider = ({ userAddress }) => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userAddress) return;

    fetch('http://localhost:3500/user/info', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success && data.data.userAddress === userAddress) {
        setNfts(data.data.nfts);
      }
    })
    .finally(() => setLoading(false));
  }, [userAddress]);

  if (loading) {
    return <div>Loading NFTs...</div>;
  }

  if (nfts.length === 0) {
    return <p style={{ textAlign: "center" }}>No NFTs found for this user.</p>;
  }

  return (
    <div className="Obhordka">
      <div className="slider-section">
        <h2 className="slider-title">USER NFTs</h2>
        <div className="slider-wrapper">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ type: 'fraction' }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="slider-main"
          >
            {nfts.map((nft, index) => (
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
    </div>
  );
};

UserNFTSlider.propTypes = {
  userAddress: PropTypes.string.isRequired,
};

export default UserNFTSlider;
