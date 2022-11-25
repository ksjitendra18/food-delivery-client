import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const EditPage = () => {
  const router = useRouter();
  const { itemId } = router.query;

  const userId = useSelector((state) => state.userId);
  const { register, handleSubmit } = useForm();

  const [formData, setFormData] = useState(null);

  const fetchItemDetails = async () => {
    const res = await fetch(`http://127.0.0.1:8080/api/v1/item/${itemId}`);

    const resData = await res.json();

    console.log("final ", resData);

    setFormData(resData);

    // console.log("success", resData);

    // console.log(formData);

    return resData;
  };

  //   fetchItemDetails();
  useEffect(() => {
    if (itemId !== undefined && itemId.length > 0) {
      //   setFormData(fetchItemDetails());
      fetchItemDetails();
    }
  }, [itemId]);

  console.log("form data", formData);

  console.log("form data is not null", formData !== null);

  const onEditItems = async (data) => {
    const rating = +data.ratings;
    const price = +data.price;

    const IsAvailable = data.is_available === "yes" ? true : false;
    const isFeatured = data.is_featured === "yes" ? true : false;

    let editedItem = {
      ...formData,
      ...data,
      price: price,
      ratings: rating,
      is_available: IsAvailable,
      is_featured: isFeatured,
    };

    // these field are not to be sent
    delete editedItem["User"];
    delete editedItem["CreatedAt"];
    delete editedItem["id"];
    delete editedItem["user_id"];
    delete editedItem["item_image"];

    console.log("THIS IS EDITED ITEM", editedItem);

    const res = await fetch(
      `http://localhost:8080/api/v1/admin/updateitem/${itemId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedItem),
      }
    );

    const resData = await res.json();
    console.log(resData);
  };

  return (
    <section className="md:my-7 lg:px-28 md:px-18  p-4">
      <h2 className="text-primary text-3xl font-bold mb-10">Edit Item</h2>

      {formData !== null ? (
        <div className="bg-primary rounded-xl text-black shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <div className="px-10 py-5">
            <form onSubmit={handleSubmit(onEditItems)}>
              <div className="mb-6">
                <label
                  htmlFor="itemname"
                  className="block mb-2 text-sm font-medium text-[#f8f8f8] "
                >
                  Item Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  id="itemname"
                  className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Enter item name"
                  defaultValue={formData.name}
                  onChange={() => {}}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="itemprice"
                  className="block mb-2 text-sm font-medium text-[#f8f8f8] "
                >
                  Item Price
                </label>
                <input
                  type="number"
                  {...register("price")}
                  id="itemprice"
                  className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Enter item price"
                  defaultValue={formData.price}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="shop_address"
                  className="block mb-2 text-sm font-medium text-[#f8f8f8] "
                >
                  Shop Address
                </label>
                <input
                  type="text"
                  {...register("shop_address")}
                  id="shop_address"
                  className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Enter Shop Adress"
                  defaultValue={formData.shop_address}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="rating"
                  className="block mb-2 text-sm font-medium text-[#f8f8f8] "
                >
                  Rating
                </label>
                <input
                  type="number"
                  max={5}
                  {...register("ratings")}
                  id="rating"
                  className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Enter Item Rating"
                  defaultValue={formData.ratings}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-[#f8f8f8] "
                >
                  Category
                </label>

                <select
                  name="category"
                  {...register("category")}
                  id="category"
                  defaultValue={formData.category}
                  className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option value="uncategorised">Choose a category</option>
                  <option value="veg">Veg Dishes</option>
                  <option value="fastfood">Fast Food </option>
                  <option value="rice">Non Veg Dishes</option>
                  <option value="icecream">Icecream</option>
                  <option value="colddrinks">Cold Drinks</option>
                </select>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="available"
                  className="block mb-2 text-sm font-medium text-[#f8f8f8] "
                >
                  Item Available
                </label>

                <select
                  name="is_available"
                  {...register("is_available")}
                  id="is_available"
                  className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="available"
                  className="block mb-2 text-sm font-medium text-[#f8f8f8] "
                >
                  Featured Item
                </label>

                <select
                  name="is_available"
                  {...register("is_featured")}
                  id="is_available"
                  className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              <div className="flex justify-end mt-5">
                <button
                  className=" text-white text-xl font-bold px-7 py-2 border-solid border-2 border-white rounded-full"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
      {/* <EditProduct itemId={itemId} /> */}
    </section>
  );
};

export default EditPage;
