import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [message, setMessage] = useState("");
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      alert("Login Successful!");
      navigate("/");
    } catch (error) {
      setMessage("Please provide a valid Email and Password");
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert("Login Successful!");
      navigate("/");
    } catch (error) {
      alert("Google Signin Failed!");
      console.error(error);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl shadow-xl">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:outline-none"
            />
          </div>
          {message && (
            <p className="text-red-400 text-sm italic mb-3">{message}</p>
          )}
          <div>
            <button className="btn-primary w-full py-3">
              Login
            </button>
          </div>
        </form>
        <p className="align-baseline text-gray-200 font-medium mt-4 text-sm">
          Don&apos;t have an account? Please {}
          <Link to="/register" className="text-yellow-400 hover:text-yellow-300">
            Register
          </Link>
        </p>
        {/* Google Sign In */}
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="
              mt-4
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              border-white/10
              bg-white/5
              py-3
              text-white
              transition
              hover:bg-white/10
              "
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div>

        <p className="mt-5 text-center text-gray-400 text-xs">
          &copy;2026 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
