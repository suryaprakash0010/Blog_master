import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { axios, setToken } = useAppContext();
  const navigate = useNavigate();

const handleSignup = async (data) => {
    try {
      const { firstName, lastName, email, password } = data;
      const { data: signupData } = await axios.post("/api/admin/signup", {
        email,
        lastName,
        firstName,
        password,
      });

      if (signupData.success) {
        setToken(signupData.token);
        localStorage.setItem("token", signupData.token);
        axios.defaults.headers.common["Authorization"] = signupData.token;
        toast.success("Signup successful!");
        navigate("/admin"); 
      } else {
        toast.error(signupData.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white border border-violet-200 shadow-xl rounded-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-black">
          <span className="text-violet-600 font-bold">Admin</span> Signup
        </h2>
        <p className="text-gray-600 text-sm mt-2 mb-6">
          Enter your details to create an admin account
        </p>

        <form className="space-y-5" onSubmit={handleSubmit(handleSignup)}>
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              placeholder="your first name"
              className="w-full mt-1 px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-violet-600"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              placeholder="your Last name"
              className="w-full mt-1 px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-violet-600"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="your email id"
              className="w-full mt-1 px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-violet-600"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="your password"
              className="w-full mt-1 px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-violet-600"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-violet-600 text-white py-2 rounded-md hover:bg-violet-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
