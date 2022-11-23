import React from "react";

const FeaturesCard = ({ className, children }) => {
  return (
    <div
      className={`${className} card flex flex-col items-center border-solid border-4 border-primary px-5 py-2 rounded-xl mt-10`}
    >
      {children}
    </div>
  );
};

export default FeaturesCard;
