import React from "react";
import CategorySection from "../order/categorySection";

const AllItems = () => {
  return (
    <section className="md:my-7 lg:px-28 md:px-18  p-4">
      <h2 className="text-primary text-3xl font-bold mb-10">All Items</h2>

      <div>
        <CategorySection category={"veg"} title={"Veg Dishes"} />
        <CategorySection category={"fastfood"} title={"Fast Food"} />
        <CategorySection category={"nonveg"} title={"Non Veg Dishes"} />
        <CategorySection category={"icecream"} title={"Icecream"} />
        <CategorySection category={"colddrinks"} title={"Cold Drinks"} />
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
