import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItem = useSelector((state) => state.cart);
  return (
    <section className="page-section">
      <Head>
        <title>Cart</title>
      </Head>
      {cartItem.length > 0 ? (
        ""
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
    </section>
  );
};

export default Cart;
