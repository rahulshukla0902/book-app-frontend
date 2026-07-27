import React from "react";
import { getImgUrl } from "../../utils/getImgUrl";
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useFetchBookByIdQuery } from "../../redux/features/books/booksApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Facing Error in Loading the Book</div>;
  }
  return (
    <div className="mx-auto mt-12 mb-12 max-w-6xl rounded-2xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl">
      <h1 className="mb-6 text-4xl font-bold text-white">{book.title}</h1>

      <div className="flex flex-col gap-10 md:flex-row">
        <div className="md:w-1/3 flex justify-center">
          <img
            src={`${getImgUrl(book.coverImage)}`}
            alt={book.title}
            className="w-72 rounded-xl shadow-lg"
          />
        </div>

        <div className="md:w-2/3">
          <div className="mb-5">
            <p className="text-gray-300 mb-2">
              <strong className="text-white">Author:</strong> {book.author || "admin"}
            </p>
            <p className="text-gray-300 mb-2">
              <strong className="text-white">Published:</strong>{" "}
              {new Date(book?.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-300 mb-2 capitalize">
              <strong className="text-white">Category:</strong> {book.category}
            </p>
            <p className="leading-8 text-gray-300">
              <strong className="text-white">Description:</strong> {book.description}
            </p>
          </div>
          <button
            onClick={() => handleAddToCart(book)}
            className="btn-primary mt-8 flex items-center gap-2 px-8 py-3"
          >
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
