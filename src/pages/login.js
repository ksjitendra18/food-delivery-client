import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <section className="page-section  max-w-[740px] px-10 py-5  bg-primary rounded-3xl text-white">
      Head
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
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-[#E1E1E1] "
          >
            Your Password
          </label>
          <input
            type="password"
            {...register("password")}
            id="email"
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

      <Link href="/signup">
        <p className="text-sm mt-5">
          Not Registered? <span className="font-bold">Sign Up</span>
        </p>
      </Link>
    </section>
  );
};

export default Login;
