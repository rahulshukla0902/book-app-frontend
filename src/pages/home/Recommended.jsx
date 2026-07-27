import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BookCard from "../books/BookCard";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

function Recommended() {
  const { data: books = [] } = useFetchAllBooksQuery();

  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-white mb-6">Recommended for you</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        mousewheel={{ enabled: true, forceToAxis: true, releaseOnEdges: true }}
        modules={[Pagination, Navigation, Mousewheel]}
        className="mySwiper"
      >
        {books.length > 0 &&
          books.slice(8, 18).map((book, index) => (
            <SwiperSlide key={index} className="bg-[#1A1A2E] border border-white/5 rounded-xl">
              <BookCard book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default Recommended;
