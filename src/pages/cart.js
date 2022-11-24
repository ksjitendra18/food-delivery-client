import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/cart/cartItem";
import OrderPrice from "../components/cart/orderPrice";

const Cart = () => {
  const cartItem = useSelector((state) => state.cart);

  const [cartItems, setCartItems] = useState([]);

  // this is preventing the hydration error by nextjs
  useEffect(() => {
    setCartItems(cartItem);
  }, [cartItem]);
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <div className="page-section lg:px-28 md:px-18 md:py-10 p-4">
        {cartItems.length > 0 ? (
          <div className=" flex  flex-col-reverse md:flex-row  gap-10 justify-between">
            <div className=" flex justify-center flex-wrap gap-20">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div className="md:sticky md:top-28 bg-primary text-white flex-none w-64 h-[300px] rounded-2xl">
              <OrderPrice />
            </div>
          </div>
        ) : (
          <div className="flex flex-col mt-20 justify-center">
            <h2 className="mt-10 text-3xl font-bold text-center">
              Cart is Empty
            </h2>

            <div className="flex justify-center">
              <button className="py-3 px-8 mt-10 bg-primary text-white rounded-full">
                <Link href="/order">Order Now</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
