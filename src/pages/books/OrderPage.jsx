import React from "react";
import { useGetOrdersByEmailQuery } from "../../redux/features/orders/ordersApi";
import { useAuth } from "../../context/AuthContext";

const OrderPage = () => {
  const { currentUser } = useAuth();
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrdersByEmailQuery(currentUser.email);
  console.log(orders);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error getting Orders data</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="mb-6 text-3xl font-bold text-white">
        Your Orders
      </h2>
      {orders.length === 0 ? (
        <div className="text-center text-lg text-gray-300">
          You have not placed any orders yet.
        </div>
      ) : (
        <div>
          {orders.map((order, index) => (
            <div key={order._id} className="mb-6 border-b border-white/10 pb-6">
              <p className="mb-2 w-fit rounded-md bg-yellow-400 px-3 py-1 text-sm font-semibold text-black">
                # {index + 1}
              </p>
              <h2 className="text-lg font-semibold text-white">Order ID: {order._id}</h2>
              <p className="text-gray-300">Name: {order.name}</p>
              <p className="text-gray-300">Email: {order.email}</p>
              <p className="text-gray-300">Phone: {order.phone}</p>
              <p className="font-semibold text-yellow-400">
                Total Price: ${order.totalPrice}
              </p>
              <h3 className="mt-4 font-semibold text-white">Address:</h3>
              <p className="text-gray-300">
                {order.address.city}, {order.address.state},{" "}
                {order.address.country}- {order.address.zipcode}
              </p>
              <h3 className="mt-4 font-semibold text-white">Products Id:</h3>
              <ul>
                {order.productIds.map((productId) => (
                  <li className="font-mono text-sm text-gray-400" key={productId}>
                    {productId}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
