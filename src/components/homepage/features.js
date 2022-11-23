import React from "react";
import FeaturesCard from "../UI/featuresCard";

const Features = () => {
  return (
    <section className="page-section lg:px-28 md:px-18 px-4">
      <h2 className="text-center text-[50px] text-primary font-bold">
        Features
      </h2>

      <div className="flex flex-col md:flex-row justify-center md:gap-10 lg:gap-32">
        <FeaturesCard>
          <h3 className="font-bold text-[25px] mt-3 mb-10">100+ Outlets</h3>
          <img src="/hotel.png" alt="" className="h-60" />
        </FeaturesCard>

        <FeaturesCard>
          <h3 className="font-bold text-[25px] mt-3 mb-10">Fast Delivery</h3>
          <img src="/delivery.png" alt="" className="h-60" />
        </FeaturesCard>

        <FeaturesCard>
          <h3 className="font-bold text-[25px] mt-3 mb-10">Quality Control</h3>
          <img src="/quality.png" alt="" className="h-60" />
        </FeaturesCard>
      </div>
    </section>
  );
};

export default Features;
