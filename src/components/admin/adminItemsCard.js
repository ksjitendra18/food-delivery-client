import { useRouter } from "next/router";
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { URL } from "../../utils/URL";
const AdminItemsCard = ({ item }) => {
  const router = useRouter();
  const handleEdit = (itemId) => {
    router.push(`/admin/edit/${itemId}`);
  };

  const handleDelete = async (itemId) => {
    const res = await fetch(`${URL}/admin/item/${itemId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const resData = await res.json();
    console.log(resData);

    router.reload();
  };
  return (
    <div className=" bg-white  text-black py-2 px-4 rounded-2xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]">
      <div className="mb-5 flex  justify-center">
        <img
          src={`/${item.item_image}`}
          alt=""
          className="h-[200px] max-w-[200px] md:mt-[-50px] mt-[-30px]"
        />
      </div>
      <div className="text-area text-center">
        <h3 className="text-xl font-bold">{item.name}</h3>
        <h3 className="text-xl mt-3">₹{item.price}</h3>
        <div className="flex justify-center gap-4 items-center mt-5 mb-3">
          <div
            className="bg-primary text-white text-2xl p-3 rounded-full cursor-pointer"
            onClick={() => handleEdit(item.id)}
          >
            <MdEdit />
          </div>
          <div
            className="bg-primary text-white text-2xl p-3 rounded-full cursor-pointer"
            onClick={() => handleDelete(item.id)}
          >
            <MdDelete />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminItemsCard;
