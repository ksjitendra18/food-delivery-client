import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import { addToCart } from "../../store/cartSlice";
import { addToCart } from "../../../store/cartSlice";

const CategoryPage = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState(null);

  const router = useRouter();

  //   { category, title, btnText }
  const { category } = router.query;

  console.log(category);

  useEffect(() => {
    if (category === "veg") {
      setTitle("Veg");
    }

    category === "nonveg" ? setTitle("Non Veg") : "";
    category === "fastfood" ? setTitle("Fast Food") : "";
    category === "icecream" ? setTitle("Icecream") : "";
    category === "colddrinks" ? setTitle("Cold Drink") : "";
  }, [category]);

  //   const title = "Okay";

  const btnText = "Click";
  const fetchData = async () => {
    const res = await fetch(
      `http://localhost:8080/api/v1/itemsbycategory/?keyword=${category}`
    );

    const data = await res.json();

    setItems(data.items);
  };

  useEffect(() => {
    if (category !== undefined) {
      fetchData();
    }
  }, [category]);
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
    <section className="md:my-7 lg:px-28 md:px-18  p-4">
      <div className="flex gap-5 items-center">
        <h2 className="text-2xl  text-primary font-bold">{title}</h2>
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
    </section>
  );
};

export default CategoryPage;
