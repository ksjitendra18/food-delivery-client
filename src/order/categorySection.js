import React from "react";

const CategorySection = ({ category, title }) => {
  // const res = await fetch("http://127.0.0.1/")
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary">{title}</h2>
    </div>
  );
};

export default CategorySection;
