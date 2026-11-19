'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';

import Link from 'next/link';
import { HomeSlideType } from '../../types/MySwiper.slider';
import AppImage from '../AppImage/AppImage';

interface MySwiperProps {
  slides: HomeSlideType[];
  slidesPerView: number;
  spaceBetween: number;
}

function MySwiper({ slides, slidesPerView, spaceBetween }: MySwiperProps) {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Keyboard, Autoplay]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        loop={true}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          bulletActiveClass: 'swiper-pagination-bullet-active',
          bulletClass: 'swiper-pagination-bullet',
        }}
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id} className="relative">
            <AppImage
              src={slide.image}
              alt="home-slider"
              width={1920}
              height={1080}
              className="w-full h-[400px] object-cover"
            />

            <div className="bg-linear-to-r from-green-900/70 to-green-800/70 flex items-center absolute inset-0 z-10">
              <div className="site-container text-white text-center md:text-start">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-8 duration-500">
                  {slide.title.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </h1>

                <p className="font-medium text-base mt-2 mb-4 animate-in fade-in slide-in-from-bottom-8 duration-500">
                  {slide.description}
                </p>

                <div className="flex flex-col md:flex-row gap-4 mt-4 w-full justify-center md:justify-start animate-in fade-in slide-in-from-bottom-8 duration-500">
                  <Link href={slide.buttonLink}>
                    <button
                      type="button"
                      className="bg-white text-[#00C950] font-semibold px-6 py-2 rounded-lg cursor-pointer hover:scale-105 transition-all duration-300 shadow-2xl"
                    >
                      {slide.buttonText}
                    </button>
                  </Link>

                  <Link href={slide.buttonLink2}>
                    <button
                      type="button"
                      className="bg-transparent border border-white/50 text-white font-semibold px-6 py-2 rounded-lg cursor-pointer hover:scale-105 transition-all duration-300 backdrop-blur-xs "
                    >
                      {slide.buttonText2}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute top-5 z-10 hidden w-full items-center justify-center gap-4 px-4 md:top-1/2 md:flex md:-translate-y-1/2 md:justify-between md:px-4">
        <button className="custom-prev cursor-pointer rounded-full bg-white/80 p-3 text-[#00C950] shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white">
          <HiArrowLeft size={24} />
        </button>
        <button className="custom-next cursor-pointer rounded-full bg-white/80 p-3 text-[#00C950] shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white">
          <HiArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}

export default MySwiper;
