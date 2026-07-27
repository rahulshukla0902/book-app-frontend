import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoSearchOutline, IoHomeOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import avatarImg from "../assets/avatar.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
  {
    name: "Dashboard",
    href: "./dashboard",
  },
  {
    name: "Orders",
    href: "./orders",
  },
  {
    name: "Cart Page",
    href: "./cart",
  },
  {
    name: "Checkout",
    href: "./checkout",
  },
];

const iconStyle =
  "size-6 text-white/70 transition-all duration-300 hover:text-white hover:scale-110";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  // console.log(cartItems);

  const { currentUser, logout } = useAuth();

  const handleLogOut = () => {
    logout();
  };

  return (
    <header className="fixed top-5 left-0 right-0 z-50 px-5">
      <nav
        className="
    mx-auto
    flex
    max-w-screen-xl
    items-center
    justify-between
    rounded-2xl
    border
    border-white/10
    bg-white/5
    px-6
    py-3
    backdrop-blur-2xl
    shadow-[0_20px_50px_rgba(0,0,0,0.35)]
  "
      >
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <IoHomeOutline className={iconStyle} />
          </Link>

          <div
            className="
              relative
              w-72
              rounded-full
              border
              border-white/10
              bg-white/5
              "
          >
            <IoSearchOutline
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-white/50
                "
            />
            <input
              type="text"
              placeholder="Search here"
              className="
                w-full
                bg-transparent
                py-2.5
                pl-11
                pr-4
                text-white
                placeholder:text-white/40
                focus:outline-none
                "
            />
          </div>
        </div>

        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt=""
                    className={`size-7 rounded-full ${
                      currentUser ? "ring-2 ring-cyan-400/70" : ""
                    }`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-5 w-48 bg-black/70 backdrop-blur-xl border border-white/10
rounded-2xl shadow-lg rounded-md z-40">
                    <ul className="py-2 text-white">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-white/10"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogOut}
                          className="block w-full px-4 py-2 text-sm hover:bg-white/10 text-left"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <HiOutlineUser className={iconStyle} />
              </Link>
            )}
          </div>
          <button className="hidden sm:block">
            <HiOutlineHeart className={iconStyle} />
          </button>
          <Link
            to="/cart"
            className="
              flex
              items-center
              gap-2
              rounded-full
              bg-amber-400
              px-5
              py-2
              font-semibold
              text-black
              transition
              hover:scale-105
              "
          >
            <HiOutlineShoppingCart className={iconStyle} />
            {cartItems.length > 0 ? (
              <span className="text-sm font-semibold sm:ml-1">
                {cartItems.length}
              </span>
            ) : (
              <span className="text-sm font-semibold sm:ml-1">0</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
