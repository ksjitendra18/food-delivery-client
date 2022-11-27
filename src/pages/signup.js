import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setCredential, setRole, setUserId } from "../store/cartSlice";
const Signup = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleRegister = async (name, email, password) => {
    const signupToast = toast.loading("Signing up...");

    try {
      const res = await fetch("http://127.0.0.1:8080/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      dispatch(setCredential(data.user));
      dispatch(setUserId(data.user?.id));
      dispatch(setRole(data.user?.role));

      console.log(data);

      router.push("/");
      toast.update(signupToast, {
        render: "Signup Success",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });

      // console.log(data);
    } catch (error) {
      console.log(error);
      toast.update(signupToast, {
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
    const name = data.name;

    handleRegister(name, email, password);
  };

  return (
    <section className="page-section max-w-[740px] px-10 py-5 m-auto bg-primary rounded-3xl text-white">
      <h2 className="mb-10 text-3xl font-bold">Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-[#E1E1E1] "
          >
            Your Name
          </label>
          <input
            type="text"
            {...register("name")}
            id="text"
            className=" border bg-[#E1E1E1] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Your Name"
            required
          />
        </div>
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
            Signup
          </button>
        </div>
      </form>

      {error && (
        <div className="error mt-5 px-4 py-2 bg-red-900 text-white rounded-xl">
          {errorMessage}
        </div>
      )}
      <Link href="/login">
        <p className="text-sm mt-5">
          Have an Account? <span className="font-bold">Log In</span>
        </p>
      </Link>
    </section>
  );
};

export default Signup;
