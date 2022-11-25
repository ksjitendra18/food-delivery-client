import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

// ID          string   `json:"id" gorm:"type:varchar(255);primaryKey"`
// Name        string   `json:"name"`
// Price       uint     `json:"price"`
// ShopAddress string   `json:"shop_address"`
// ItemImage   string   `json:"item_image"`
// Ratings     *float64 `json:"ratings" gorm:"default:0"`
// Category    string   `json:"category"`
// IsAvailable bool     `json:"is_available" gorm:"default:true"`
// UserRefer   string   `json:"user_id"`
// User        User     `gorm:"foreignkey:UserRefer"`
// CreatedAt   time.Time

const AddProducts = () => {
  const userId = useSelector((state) => state.userId);
  const { register, handleSubmit } = useForm();
  const [imageAsset, setImageAsset] = useState(null);

  const uploadImage = (e) => {
    const fileName = e.target.files[0];
    setImageAsset(fileName.name);
  };

  const deleteImage = () => {
    setImageAsset(null);
  };

  const handleAddItems = async (item) => {
    console.log(userId);

    const res = await fetch("http://127.0.0.1:8080/api/v1/admin/item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    const resData = await res.json();

    // axios
    //   .post("http://127.0.0.1:8080/api/v1/admin/item", item)
    //   .then((response) => {
    //     console.log(response.status);
    //     console.log(response.data);
    //   });

    console.log("final ", item);

    // console.log("success", resData);
  };

  const onAddItems = (data) => {
    const rating = +data.ratings;
    const price = +data.price;

    const IsAvailable = data.is_available === "yes" ? true : false;
    const isFeatured = data.is_featured === "yes" ? true : false;

    const item = {
      name: data.name,
      price: price,
      shop_address: data.shop_address,
      item_image: imageAsset,
      ratings: rating,
      category: data.category,
      is_available: IsAvailable,
      is_featured: isFeatured,
      user_id: userId,
    };

    handleAddItems(item);
  };
  return (
    <div className="bg-primary rounded-xl text-black shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <div className="px-10 py-5">
        <form onSubmit={handleSubmit(onAddItems)}>
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
            {/* <input
              type="text"
              {...register("category")}
              id="category"
              className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter Shop Adress"
              required
            /> */}
            <select
              name="category"
              {...register("category")}
              id="category"
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

          <div className="mb-6">
            <label
              htmlFor="uploadedimage"
              className="block mb-2 text-sm font-medium text-[#f8f8f8] "
            >
              Item Image
            </label>

            <div className="text-white flex justify-center items-center flex-col border-2 border-dotted border-gray-100 w-full h-[225px] md:h-[320px] cursor-pointer rounded-lg">
              {!imageAsset ? (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <MdCloudUpload className="text-3xl hover:text-gray-300" />
                    <p className="hover:text-gray-300">Click here to upload</p>
                  </div>
                  <input
                    type="file"
                    name="uploadimage"
                    accept="image/*"
                    onChange={uploadImage}
                    className="w-0 h-0"
                    required
                  />
                </label>
              ) : (
                <>
                  <div className="relative flex items-center h-full md:w-[400px]">
                    <img
                      src={`/${imageAsset}`}
                      alt="Uploaded"
                      className="h-[200px]"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 md:top-10 md:right-28 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-primary" />
                    </button>
                  </div>
                </>
              )}
            </div>
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
  );
};

export default AddProducts;
