import React from "react";

const SingleOrderData = ({ items, total }) => {
  return (
    <div className="flex flex-1 gap-5 flex-col max-w-[500px]">
      {items &&
        items.map((item) => (
          <div
            key={item.id}
            className="card rounded-lg flex justify-between py-5 px-3   shadow-[rgba(0,_0,_0,_0.14)_0px_3px_8px]"
          >
            <p className="font-bold">
              {item.quantity} x {item.name}
            </p>

            <p className="font-bold">₹{+item.quantity * +item.price}</p>
          </div>
        ))}

      <div className="flex justify-between">
        <p className="text-[20px] font-bold mt-5">Total: </p>
        <p className="text-[20px] font-bold mt-5"> ₹{total}</p>
      </div>
    </div>
  );
};

export default SingleOrderData;
