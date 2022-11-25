import React, { useEffect, useState } from "react";
import AdminItemsCard from "./adminItemsCard";

const AdminItems = () => {
  const [items, setItems] = useState([]);
  const fetchData = async () => {
    const res = await fetch("http://127.0.0.1:8080/api/v1/items");
    const data = await res.json();
    console.log(data);

    setItems(data.items);
    return data;
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(items)
  return <div className="flex flex-wrap justify-center md:justify-start gap-10">
    {items.map(item => <AdminItemsCard key={item.id} item={item}/>)}
  </div>;
};

export default AdminItems;
