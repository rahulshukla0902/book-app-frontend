import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="rounded-xl bg-[#1A1A2E] border border-white/5 overflow-hidden">
      <div className="flex flex-col justify-between p-5 items-center">
        <div className="sm:h-60 sm:w-40 sm:flex-shrink-0 rounded-xl border border-white/5 bg-[#1A1A2E]">
          <Link to={`/books/${book?._id}`}>
            <img
              src={`${getImgUrl(book?.coverImage)}`}
              alt=""
              className="w-full h-72 object-cover rounded-l-xl"
            />
          </Link>
        </div>

        <div className="pt-2">
          <Link to={`/books/${book._id}`}>
            <h3 className="text-xl font-semibold text-white hover:text-violet-300 transition-colors duration-200 mb-3">
              {book?.title}
            </h3>
          </Link>
          <p className="text-gray-300 leading-7 mb-5">
            {book?.description.length > 80
              ? `${book?.description.slice(0, 80)}...`
              : book?.description}
          </p>

          <p className="mb-5">
            <span className="text-yellow-400 text-xl font-bold">
              ${book?.newPrice}
            </span>
            <span className="text-gray-500 line-through font-normal ml-2">
              ${book?.oldPrice}
            </span>
          </p>

          <button
            onClick={() => handleAddToCart(book)}
            className="btn-primary px-6 space-x-1 flex items-center gap-1 "
          >
            <FiShoppingCart className="" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
