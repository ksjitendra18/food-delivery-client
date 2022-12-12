import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../store/cartSlice";
import { URL } from "../utils/URL";
const CategorySection = ({ category, title, btnText }) => {
  const [items, setItems] = useState([]);
  const fetchData = async () => {
    const res = await fetch(`${URL}/itemsbycategory/?keyword=${category}`);

    const data = await res.json();

    setItems(data.items);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const dispatch = useDispatch();
  const showToastMessage = () => {
    toast.success("Item Added to Cart", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleAddToCart = (item) => {
    console.log(item);
    dispatch(addToCart(item));
    showToastMessage();
  };

  console.log(items);
  return (
    <div>
      <div className="flex gap-5 items-center">
        <h2 className="text-xl md:text-2xl  text-primary font-bold">{title}</h2>
        <button className="text-white text-sm  bg-primary font-bold px-5 py-2 rounded-full">
          <Link href={`/order/category/${category}`}> {btnText}</Link>
        </button>
      </div>

      <div className="flex items-center  flex-col md:flex-row gap-10 mt-20 mb-16">
        {items &&
          items.map((item) => (
            <div
              key={item.id}
              className="trendingcard   bg-white px-4 py-2 text-black  rounded-2xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]"
            >
              <div className="mb-5 flex justify-center">
                <img
                  src={`/${item.item_image}`}
                  alt=""
                  className="h-[200px] max-w-[230px] md:mt-[-50px] mt-[-30px]"
                />
              </div>
              <div className="text-area text-center">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <h3 className="text-xl mt-3">₹{item.price}</h3>
                <div className="flex justify-end items-center mt-3">
                  <div
                    className="bg-primary text-white text-2xl p-3 rounded-full cursor-pointer"
                    onClick={() => handleAddToCart(item)}
                  >
                    <MdAddShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategorySection;
