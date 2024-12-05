
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles/SliderBlock.css'; // Стилі

import { Pagination, Navigation } from 'swiper/modules';

const SliderBlock = () => {
  return (
    
    <div className='slider'>
    <div className="slider-block">
      <h2 className="slider-title">ABOUT PROJECT</h2>
      <div className="slider-container glass-slider">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{
            type: 'fraction',
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="/picture/aboutUS-2.jpg" alt="Slide 1" className="slider-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/picture/aboutUS-3.jpg" alt="Slide 2" className="slider-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/picture/aboutUS-4.png" alt="Slide 3" className="slider-image" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
  );
};

export default SliderBlock;
