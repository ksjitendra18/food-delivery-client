import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../utils/firebase";

const MyOrders = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const userId = useSelector((state) => state.userId);

  const [orderData, setOrderData] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  // console.log(userInfo?.id);
  useEffect(() => {
    setUserInfo(currentUser);

    console.log("I ran after user id got set");

    const fetchOrders = async () => {
      // const userId = userInfo?.id;

      if (userId !== null) {
        const q = query(collection(db, userId), orderBy("orderedTime", "desc"));

        const getOrders = onSnapshot(q, (querySnapshot) => {
          let ordersArray = [];
          querySnapshot.forEach((doc) => {
            // console.log({...doc.data()});
            ordersArray.push({ ...doc.data(), id: doc.id });
            console.log("orders array", ordersArray);
          });
          setOrderData(ordersArray);
        });
        return getOrders;
      }
    };

    fetchOrders();
  }, []);

  // const fetchOrders = async () => {
  //   const userId = userInfo?.id;

  //   console.log(userId);
  // };

  // fetchOrders();

  console.log(orderData);

  return (
    <section className="md:my-7 lg:px-28 md:px-18  p-4">
      <Head>
        <title>My Orders</title>
      </Head>
      <h2 className="text-primary text-3xl font-bold mb-10">Your Orders</h2>
      <div className="card ">
        {orderData.length > 0 ? (
          orderData.map((orders) => (
            <div className="card mb-7" key={orders.id}>
              <Link href={`/myorders/${orders.id}`}>
                <div className="card cursor-pointer rounded-lg flex flex-col md:flex-row justify-between py-5 px-3   shadow-[rgba(0,_0,_0,_0.14)_0px_3px_8px]">
                  <p>
                    <span className="font-bold">Order Id:</span> {orders.id}
                  </p>
                  {/* <p>Amount: {orders.totalprice}</p> */}
                  <p>
                    <span className="font-bold">Order Status:</span>{" "}
                    <span
                      className={`${
                        orders.orderStatus === "Preparing"
                          ? "text-red-800"
                          : "text-green-600"
                      } font-semibold`}
                    >
                      {orders.orderStatus}
                    </span>
                  </p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div>
            <h2>You have not made any order yet. Order Now!!</h2>

            <button class="py-3 px-8 mt-5 bg-primary text-white rounded-full">
              <Link href="/order">Order Now</Link>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyOrders;
