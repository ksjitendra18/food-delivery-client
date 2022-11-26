import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Success = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const userAuth = useSelector((state) => state.userId);

  const [authStatus, setAuthStatus] = useState(false);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    setUserInfo(currentUser);
    setAuthStatus(userAuth !== null);
  }, []);

  return (
    <section className="md:my-7 lg:px-28 md:px-18  p-4">
      <Head>
        <title>Order Success</title>
      </Head>
      <div className="bg-primary w-[800px] mx-auto rounded-xl text-white py-5 px-5">
        {authStatus && (
          <h2 className="text-2xl font-bold"> Dear, {userInfo.name}</h2>
        )}
        We have successfully received your order. You will receive confimation
        soon. Check your order status
      </div>
    </section>
  );
};

export default Success;
