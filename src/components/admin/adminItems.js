import React, { useEffect, useState } from "react";
import AdminItemsCard from "./adminItemsCard";
import { URL } from "../../utils/URL";
const AdminItems = () => {
  const [items, setItems] = useState([]);
  const fetchData = async () => {
    const res = await fetch(`${URL}/items`);
    const data = await res.json();
    console.log(data);

    setItems(data.items);
    return data;
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(items);
  return (
    <div className="flex flex-wrap justify-center md:justify-start gap-10">
      {items.map((item) => (
        <AdminItemsCard key={item.id} item={item} />
      ))}


      
    </div>
  );
};

export default AdminItems;
