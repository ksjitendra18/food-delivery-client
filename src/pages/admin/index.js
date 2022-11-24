import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
    return <div>Admin</div>;
  } else {
    return null;
  }
};

export default Admin;
