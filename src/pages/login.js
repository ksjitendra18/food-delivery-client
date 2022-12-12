import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setCredential, setRole, setUserId } from "../store/cartSlice";
import { URL } from "../utils/URL";
const Login = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (email, password) => {
    console.log(email, password);
    const loginToast = toast.loading("Fetching Details...");
    try {
      const res = await fetch(`${URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);

      dispatch(setCredential(data.user));
      dispatch(setUserId(data.user?.id));
      dispatch(setRole(data.user?.role));

      if (data.success === "false") {
        setError(true);
        setErrorMessage(data.message);
        toast.update(loginToast, {
          render: "Something went wrong",
          type: "error",
          isLoading: false,
          autoClose: 1500,
        });
        return;
      }

      router.push("/");
      toast.update(loginToast, {
        render: "Login Success",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });

      // console.log(data);
    } catch (error) {
      console.log(error);
      toast.update(loginToast, {
        render: "Something went wrong",
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });

      setError(true);
      setErrorMessage(error.message);
    }
  };

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    setError(false);
    setErrorMessage("");

    handleLogin(email, password);
  };

  return (
    <section className="page-section  max-w-[740px] px-10 py-5  bg-primary rounded-3xl text-white">
      <Head>
        <title>Login</title>
      </Head>
      <h2 className="mb-10 text-3xl font-bold">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-[#E1E1E1] "
          >
            Your email
          </label>
          <input
            type="email"
            {...register("email")}
            id="email"
            className=" border bg-[#E1E1E1] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="name@example.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-[#E1E1E1] "
          >
            Your Password
          </label>
          <input
            type="password"
            {...register("password")}
            id="password"
            className=" border bg-[#E1E1E1] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="more than 6 characters"
            required
          />
        </div>

        <div className="flex justify-end items-center ">
          <button
            className="bg-[#121212] text-white py-2 px-6 rounded-full text-center flex items-center"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      {error && (
        <div className="error mt-5 px-4 py-2 bg-red-900 text-white rounded-xl">
          {errorMessage}
        </div>
      )}
      <Link href="/signup">
        <p className="text-sm mt-5">
          Not Registered? <span className="font-bold">Sign Up</span>
        </p>
      </Link>
    </section>
  );
};

export default Login;
