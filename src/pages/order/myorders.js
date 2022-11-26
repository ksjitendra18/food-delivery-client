import React from "react";
import { useSelector } from "react-redux";

const MyOrders = () => {
  const orderedItems = useSelector((state) => state.orderedItems);
  console.log(orderedItems[0]);

  return <div>MyOrders</div>;
};

export default MyOrders;
