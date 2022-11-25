import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminItems from "../../components/admin/adminItems";

const Admin = () => {
  const router = useRouter();
  const userRole = useSelector((state) => state.userRole);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  console.log(userRole);
  // const redirectToHome = () => router.push("/login");

  useEffect(() => {
    if (userRole !== "admin") {
      router.push("/");
    }
    setUserIsAdmin(true);
  }, []);

  if (userIsAdmin) {
    return (
      <section className="md:my-7 lg:px-28 md:px-18  p-4">
        <div className="flex mb-16 gap-10 justify-between md:justify-start items-center">
          <h2 className="text-primary text-3xl font-bold ">All Items</h2>
          <button className="bg-primary px-4 py-2 md:px-7 md:py-3 text-white font-bold rounded-full">
            Add Item
          </button>
        </div>

        <AdminItems />
      </section>
    );
  } else {
    return null;
  }
};

export default Admin;
