import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import TrendingCard from "../ui/trendingCard";

const items = [
  {
    id: 1,
    name: "Paneer Curry",
    price: 200,
    image: "paneer.png",
  },
  {
    id: 2,
    name: "Pizza",
    price: 350,
    image: "pizza-trending.png",
  },
  {
    id: 3,
    name: "Icecream",
    price: 150,
    image: "i4.png",
  },
];

const Trending = () => {
  const [featuredItems, setFeaturedItems] = useState([]);

  const fetchFeaturedItems = async () => {
    const res = await fetch("http://localhost:8080/api/v1/featured");
    const data = await res.json()

    setFeaturedItems(data)
  };

  useEffect(()=>{
    fetchFeaturedItems()
  }, [])
  return (
    <section className="page-section lg:px-28 md:px-18 md:py-10 p-4 bg-primary md:rounded-none rounded-xl">
      <h2 className="text-center text-[50px] text-white font-bold">Trending</h2>
      <div className="flex justify-center flex-col md:flex-row gap-10 mt-20">
        {featuredItems.map((item) => (
          <TrendingCard key={item.id} item={item} />
        ))}
        {/* <div className="trendingcard bg-white  text-black py-2 px-4 rounded-2xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]">
          <div className="">
            <img src="/paneer.png" alt="" className="h-[200px] mt-[-50px] " />
          </div>
          <div className="text-area text-center">
            <h3 className="text-xl font-bold"> Paneer Curry</h3>
            <h3 className="text-xl mt-3">₹400</h3>
            <div className="flex justify-end items-center mt-3">
              <div className="bg-primary text-white text-2xl p-3 rounded-full cursor-pointer">
                <MdAddShoppingCart />
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <div className="flex justify-center items-center mt-12">
        <button className="text-xl font-bold border-solid border-4 border-white text-white rounded-full px-9 py-4">
          <Link href="/order">View All Items</Link>
        </button>
      </div>
    </section>
  );
};

export default Trending;
