import { useRouter } from "next/router";
import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import Head from "next/head";
import Loading from "../../components/ui/loading";

const SingleOrderComp = React.lazy(() => import("../../order/singleOrderData"));
import SingleOrderData from "../../order/singleOrderData";
const OrderData = () => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.currentUser);
  const userId = useSelector((state) => state.userId);

  const [orderData, setOrderData] = useState(null);
  const [items, setItems] = useState(null);
  const [total, setTotal] = useState(null);

  const { orderId } = router.query;

  console.log(orderId);

  //   const fetchSingleOrderData = async () => {
  //     console.log(userId);
  //     if (userId !== null || userId !== undefined) {
  //       const docRef = doc(db, userId, orderId);
  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         //   console.log("Document data:", docSnap.data());
  //         setOrderData(docSnap.data());
  //         setItems(docSnap.data()?.cartItems);
  //         setTotal(docSnap.data().totalprice);
  //         return docSnap.data();
  //       } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //       }
  //     } else {
  //       return;
  //     }
  //   };

  console.log(orderData, items);

  useEffect(() => {
    const fetchSingleOrderData = async () => {
      console.log(userId);
      if (userId !== null || (userId !== undefined && orderId !== undefined)) {
        console.log("INSIDE FN", userId, orderId);
        const docRef = await doc(db, userId, orderId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          //   console.log("Document data:", docSnap.data());
          setOrderData(docSnap.data());
          setItems(docSnap.data()?.cartItems);
          setTotal(docSnap.data().totalprice);
          return docSnap.data();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }
      //    else {
      //     return;
      //   }
    };

    if (orderId !== undefined && (userId !== null || userId !== undefined)) {
      fetchSingleOrderData();
    }
    // setOrderData(fetchSingleOrderData());
  }, [orderId, userId]);
  return (
    <section className="md:my-7 lg:px-28 md:px-18  p-4">
      <Head>
        <title> Order Details</title>
      </Head>
      <h2 className="text-primary text-3xl font-bold mb-10">
        Your Order Details
      </h2>
      {/* 
      <Suspense fallback={<Loading />}>
        <SingleOrderComp items={items} total={total} />
      </Suspense> */}

      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-1 gap-5 flex-col max-w-[500px]">
          {items &&
            items.map((item) => (
              <div
                key={item.id}
                className="card rounded-lg flex justify-between py-5 px-3   shadow-[rgba(0,_0,_0,_0.14)_0px_3px_8px]"
              >
                <p className="font-bold">
                  {item.quantity} x {item.name}
                </p>

                <p className="font-bold">₹{+item.quantity * +item.price}</p>
              </div>
            ))}

          <div className="flex justify-between">
            <p className="text-[20px] font-bold mt-5">Amount Paid: </p>
            <p className="text-[20px] font-bold mt-5"> ₹{total}</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col rounded-xl px-3 py-5 bg-primary md:max-w-[600px]">
          <div className="my-5 flex flex-col mx-3 text-white">
            <div className="flex gap-3 items-center">
              <h3 className="font-bold text-xl">Order Status : </h3>{" "}
              <span
                className={`px-5 py-2 rounded-full ${
                  orderData && orderData.orderStatus === "Processing"
                    ? "bg-red-600"
                    : "bg-green-600"
                } `}
              >
                {orderData && orderData.orderStatus}
              </span>
            </div>
            <div className="flex mt-5 gap-3 items-center">
              <h3 className=" text-xl font-bold ">Delivery Address:</h3>
              <p className="font-bold">{orderData && orderData.address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderData;
