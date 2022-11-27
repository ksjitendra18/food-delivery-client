import React from "react";
import { ToastContainer } from "react-toastify";
import CategorySection from "../order/categorySection";
import "react-toastify/dist/ReactToastify.css";

const AllItems = () => {
  return (
    <section className="md:my-7 lg:px-28 md:px-18  p-4">
      {/* <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      /> */}
      <h2 className="text-primary text-3xl font-bold mb-10">Order</h2>

      <div>
        <CategorySection category={"veg"} title={"Veg Dishes"} btnText={"View All Veg Dishes"} />
        <CategorySection category={"fastfood"} title={"Fast Food"} btnText={"View All Fast Food"}/>
        <CategorySection category={"nonveg"} title={"Non Veg Dishes"} btnText={"View All Non Veg Dishes"}/>
        <CategorySection category={"icecream"} title={"Icecream"} btnText={"View All Icecreams"} />
        <CategorySection category={"colddrinks"} title={"Cold Drinks"} btnText={"View All Cold Drinks"}  />
      </div>
    </section>
  );
};

export default AllItems;

{
  /* <option value="veg">Veg Dishes</option>
<option value="fastfood">Fast Food </option>
<option value="nonveg">Non Veg Dishes</option>
<option value="icecream">Icecream</option>
<option value="colddrinks">Cold Drinks</option> */
}
