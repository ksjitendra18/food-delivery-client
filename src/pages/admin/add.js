import Head from "next/head";
import React from "react";
import AddProducts from "../../components/admin/addProducts";

const Add = () => {
  return (
    <section className="md:my-7 lg:px-28 md:px-18  p-4">
      <Head>
        <title>Add Products</title>
      </Head>
      <h2 className="text-primary text-3xl font-bold mb-10">Add Items</h2>
      <AddProducts />
    </section>
  );
};

export default Add;
