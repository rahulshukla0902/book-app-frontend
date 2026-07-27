import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi";
import Swal from "sweetalert2";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);

  const { currentUser } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const navigate = useNavigate();

  const [isChecked, setisChecked] = useState(false);

  const onSubmit = async (data) => {
    const newOrder = {
      name: data.name,
      email: currentUser?.email,
      address: {
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode,
      },
      phone: data.phone,
      productIds: cartItems.map((item) => item?._id),
      totalPrice: totalPrice,
    };

    try {
      await createOrder(newOrder).unwrap();
      Swal.fire({
        title: "Confirmed Order",
        text: "Your Order has been placed successfully!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!",
      });
      navigate("/orders");
    } catch (error) {
      console.error("Error Placing an Order", error);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center text-white text-lg">
            Loading...
      </div>
    )
  }
  return (
    <section>
      <div className="min-h-screen p-6 bg-transparent flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Cash On Delivery
              </h2>
              <p className="text-lg text-yellow-400 font-semibold mb-2">Total Price: ${totalPrice}</p>
              <p className="text-gray-300 mb-6">
                Items: {cartItems.length > 0 ? cartItems.length : 0}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 md:p-8 mb-6 shadow-lg">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
              >
                <div className="text-gray-300">
                  <p className="text-xl font-semibold text-white">Personal Details</p>
                  <p className="text-gray-300">
                    Please fill out all the fields.
                  </p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label
                        htmlFor="full_name"
                        className="text-gray-200 font-medium"
                      >
                        Full Name
                      </label>
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        name="name"
                        id="name"
                        className="h-10 w-full rounded-lg border border-white/10 bg-white/10 px-4 text-white placeholder:text-gray-400 focus:outline-none focus:border-yellow-400"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label
                        htmlFor="full_name"
                        className="text-gray-200 font-medium"
                      >
                        Email Address
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="h-10 mt-1 rounded px-4 w-full bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:border-yellow-400"
                        disabled
                        defaultValue={currentUser?.email}
                        placeholder="email@domain.com"
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label
                        htmlFor="phone"
                        className="text-gray-200 font-medium"
                      >
                        Phone Number
                      </label>
                      <input
                        {...register("phone", { required: true })}
                        type="number"
                        name="phone"
                        id="phone"
                        className="h-10 mt-1 rounded px-4 w-full bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:border-yellow-400"
                        placeholder="+123 456 7890"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label
                        htmlFor="address"
                        className="text-gray-200 font-medium"
                      >
                        Address / Street
                      </label>
                      <input
                        {...register("address", { required: true })}
                        type="text"
                        name="address"
                        id="address"
                        className="h-10 mt-1 rounded px-4 w-full bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:border-yellow-400"
                        placeholder=""
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="city"
                        className="text-gray-200 font-medium"
                      >
                        City
                      </label>
                      <input
                        {...register("city", { required: true })}
                        type="text"
                        name="city"
                        id="city"
                        className="h-10 mt-1 rounded px-4 w-full bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:border-yellow-400"
                        placeholder=""
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="country"
                        className="text-gray-200 font-medium"
                      >
                        Country / Region
                      </label>
                      <div className="h-10 bg-white/10 flex border border-white/10 rounded items-center mt-1">
                        <input
                          {...register("country", { required: true })}
                          name="country"
                          id="country"
                          placeholder="Country"
                          className="px-4 appearance-none outline-none text-white w-full bg-transparent"
                        />
                        <button
                          tabIndex="-1"
                          className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
                        >
                          <svg
                            className="w-4 h-4 mx-2 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                        <button
                          tabIndex="-1"
                          className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
                        >
                          <svg
                            className="w-4 h-4 mx-2 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="18 15 12 9 6 15"></polyline>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="state"
                        className="text-gray-200 font-medium"
                      >
                        State / Province
                      </label>
                      <div className="h-10 bg-white/10 flex border border-white/10 rounded items-center mt-1">
                        <input
                          {...register("state", { required: true })}
                          name="state"
                          id="state"
                          placeholder="State"
                          className="px-4 appearance-none outline-none text-white w-full bg-transparent"
                        />
                        <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                          <svg
                            className="w-4 h-4 mx-2 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                        <button
                          tabIndex="-1"
                          className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
                        >
                          <svg
                            className="w-4 h-4 mx-2 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="18 15 12 9 6 15"></polyline>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-1">
                      <label
                        htmlFor="zipcode"
                        className="text-gray-200 font-medium"
                      >
                        Zipcode
                      </label>
                      <input
                        {...register("zipcode", { required: true })}
                        type="text"
                        name="zipcode"
                        id="zipcode"
                        className="transition-all flex items-center h-10 mt-1 rounded px-4 w-full bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:border-yellow-400"
                        placeholder=""
                      />
                    </div>

                    <div className="md:col-span-5 mt-3">
                      <div className="inline-flex items-center">
                        <input
                          onChange={(e) => setisChecked(e.target.checked)}
                          type="checkbox"
                          name="billing_same"
                          id="billing_same"
                          className="form-checkbox"
                        />
                        <label
                          htmlFor="billing_same"
                          className="ml-2 text-gray-300"
                        >
                          I agree to the{" "}
                          <Link className="underline underline-offset-2 text-yellow-400 hover:text-yellow-300">
                            Terms & Conditions
                          </Link>{" "}
                          and{" "}
                          <Link className="underline underline-offset-2 text-yellow-400 hover:text-yellow-300">
                            Shopping Policy.
                          </Link>
                        </label>
                      </div>
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          disabled={!isChecked}
                          className="btn-primary text-white font-bold py-2 px-4 rounded"
                        >
                          Place an Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
