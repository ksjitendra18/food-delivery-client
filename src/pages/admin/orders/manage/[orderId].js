import { useRouter } from "next/router";
import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  doc,
  getDoc,
  onSnapshot,
  Timestamp,
  updateDoc,
  writeBatch,
} from "firebase/firestore";

import { db } from "../../../../utils/firebase";
import Head from "next/head";

const OrderData = () => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.currentUser);
  const userId = useSelector((state) => state.userId);

  const [orderData, setOrderData] = useState(null);
  const [items, setItems] = useState(null);
  const [total, setTotal] = useState(null);
  const [toggleChangeOrderStatus, setToggleChangeOrderStatus] = useState(false);
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
      if (orderId !== undefined) {
        console.log("INSIDE FN", orderId);
        const docRef = await doc(db, "orders", orderId);
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
    };

    if (orderId !== undefined) {
      fetchSingleOrderData();
    }
    // setOrderData(fetchSingleOrderData());
  }, [orderId]);

  // useEffect(() => {
  //   const fetchSingleOrderData = async () => {
  //     if (orderId !== undefined) {
  //       console.log("INSIDE FN", orderId);
  //       const docRef = await doc(db, "orders", orderId);
  //       const docSnap = await getDoc(docRef);

  //       const unsub = onSnapshot(doc(db, "orders", orderId), (doc) => {
  //         console.log("snapshot data: ", doc.data());

  //         setOrderData(docSnap.data());
  //         setItems(docSnap.data()?.cartItems);
  //         setTotal(docSnap.data().totalprice);
  //       });

  //       // if (docSnap.exists()) {
  //       //   //   console.log("Document data:", docSnap.data());
  //       //   setOrderData(docSnap.data());
  //       //   setItems(docSnap.data()?.cartItems);
  //       //   setTotal(docSnap.data().totalprice);
  //       //   return docSnap.data();
  //       // } else {
  //       //   // doc.data() will be undefined in this case
  //       //   console.log("No such document!");
  //       // }
  //     }
  //   };

  //   if (orderId !== undefined) {
  //     fetchSingleOrderData();
  //   }
  //   // setOrderData(fetchSingleOrderData());
  // }, [orderId]);
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
            <div className="flex flex-wrap  gap-3 items-center">
              <h3 className=" text-xl font-bold ">User Name:</h3>
              <p className="font-bold">
                {(orderData && orderData.userName) || "User"}
              </p>
            </div>
            <div>
              <div className="flex flex-col md:flex-row mt-5 gap-3 md:items-center">
                <h3 className="font-bold text-xl">Order Status : </h3>{" "}
                {/* <span
                  className={`px-5 py-2 rounded-full ${
                    orderData && orderData.orderStatus === "Preparing"
                      ? "bg-red-600"
                      : "bg-green-600"
                  } `} */}
                <span
                  className={`px-5 py-2 rounded-full ${
                    orderData && orderData.orderStatus === "Preparing"
                      ? "bg-red-800"
                      : ""
                  }
                  
                  ${
                    orderData && orderData.orderStatus === "Delivering"
                      ? "bg-white text-orange-600"
                      : ""
                  }
                  
                  ${
                    orderData && orderData.orderStatus === "Delivered"
                      ? "bg-green-600"
                      : ""
                  }  `}
                >
                  {orderData && orderData.orderStatus}
                </span>
                <h3
                  className="font-bold cursor-pointer"
                  onClick={() => setToggleChangeOrderStatus((prev) => !prev)}
                >
                  Change Status
                </h3>
              </div>
              {toggleChangeOrderStatus && (
                <div className="flex">
                  <ChangeOrderStatus
                    currentStatus={orderData.orderStatus}
                    userId={orderData.user_id}
                    orderId={orderId}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row mt-5 gap-3 md:items-center">
              <h3 className=" text-xl font-bold ">Delivery Address:</h3>
              <p className="font-bold">{orderData && orderData.address}</p>
            </div>
            <div className="flex flex-col md:flex-row mt-5 gap-3 md:items-center">
              <h3 className=" text-xl font-bold ">Order Id:</h3>
              <p className="font-bold">{orderId && orderId}</p>
            </div>
            <div className="flex flex-col md:flex-row mt-5 gap-3 md:items-center">
              <h3 className=" text-xl font-bold ">User Id:</h3>
              <p className="font-bold">{orderData && orderData.user_id}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ChangeOrderStatus = ({ currentStatus, userId, orderId }) => {
  console.log(currentStatus);
  const router = useRouter()

  const changeStatus = async (status) => {
    const batch = writeBatch(db);

    const docRef = await doc(db, userId, orderId);
    const adminDocRef = await doc(db, "orders", orderId);
    batch.update(docRef, {
      orderStatus: status,
      updatedAt: Timestamp.now(),
    });
    batch.update(adminDocRef, {
      orderStatus: status,
      updatedAt: Timestamp.now(),
    });

    batch.commit();
    router.reload();
    console.log(status);
  };

  return (
    <div className="flex gap-5 flex-wrap mt-5">
      <button
        className={` ${
          currentStatus == "Preparing" ? "bg-green-500" : ""
        } border-3 border-solid border-white px-5 py-1 rounded-full font-bold`}
        onClick={() => changeStatus("Preparing")}
      >
        Preparing
      </button>
      <button
        className={` ${
          currentStatus == "Delivering" ? "bg-green-500" : ""
        } border-3 border-solid border-white px-5 py-1 rounded-full font-bold`}
        onClick={() => changeStatus("Delivering")}
      >
        Delivering
      </button>
      <button
        className={` ${
          currentStatus == "Delivered" ? "bg-green-500" : ""
        } border-3 border-solid border-white px-5 py-1 rounded-full font-bold`}
        onClick={() => changeStatus("Delivered")}
      >
        Delivered
      </button>
    </div>
  );
};

export default OrderData;
