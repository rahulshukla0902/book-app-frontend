import { useState, useEffect } from "react";
import BookCard from "../books/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";
import { data } from "react-router-dom";

const categories = [
  "Choose a genre",
  "Business",
  "Fiction",
  "Horror",
  "Adventure",
];
const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

  const { data: books = [] } = useFetchAllBooksQuery();
  // console.log(books);

  // console.log(books);

  const filteredBooks =
    selectedCategory === "Choose a genre"
      ? books
      : books.filter(
          (book) => book.category === selectedCategory.toLowerCase()
        );

  // console.log(filteredBooks);

  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold text-white mb-6">Top Sellers</h2>
      <div className="mb-8 flex items-center">
        <select
          name="category"
          id="category"
          className="w-64 h-12 rounded-md border border-white/20 bg-white/10 text-white px-4 backdrop-blur-md focus:outline-none"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category, index) => (
            <option value={category} key={index} className="rounded-md bg-[#111827] text-white">
              {category}
            </option>
          ))}
        </select>
      </div>

      <Swiper
        grabCursor={true}
        simulateTouch={true}
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
        {filteredBooks.length > 0 &&
          filteredBooks.map((book, index) => (
            <SwiperSlide key={index} className="bg-[#1A1A2E] border border-white/5 rounded-xl">
              <BookCard book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default TopSellers;
