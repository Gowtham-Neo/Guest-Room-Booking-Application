import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signup from "../../assets/images/signup.avif";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CuSignupForm = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");
    const [error, setError] = useState("");
  const navigate = useNavigate();
  const handlesubmit = async (event) => {
    event.preventDefault();
    const csrfToken = localStorage.getItem('csrfToken');
    if (!name || !email || !password || !number) {
      setError("Please fill all the fields.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/Cu/signup`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          'X-CSRF-Token': csrfToken
       },
        body: JSON.stringify({ name, email,number, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log("response is: ", response);
        setError(data.message)
        setTimeout(()=>{
          setError("")
        },3000)
        throw new Error("Sign-up failed");
      }

      console.log("Sign-up successful");

      localStorage.setItem("auth_token", data.auth_token);
      localStorage.setItem("user-customer", JSON.stringify(data.user));

      navigate("/booking");
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
     <div className="flex flex-col w-full max-w-xl px-6 py-8 bg-white border-4 border-gray-300 border-dotted rounded-lg shadow-md md:flex-row">
      <div className="md:border-r md:w-full">
        <img
          src={signup}
          alt="signup"
          className="object-cover w-full h-full rounded-r-lg"
        />
      </div>
      <div className="p-4 md:w-full ">
        <h1 className="mb-8 text-3xl font-bold text-center text-gray-800 ">
        Guest Sign Up
        </h1>
        <div>
        <form onSubmit={handlesubmit}>
            <div>
            <label className="block mb-2 font-semibold text-gray-700">
                Name:
            </label>
            <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
            />
            </div>
            <div>
            <label className="block mb-2 font-semibold text-gray-700">
                Email:
            </label>
            <input
                type="email"
                name="userEmail"
                id="userEmail"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                    setError("")
                }}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
            />
            </div>
            
            <div>
            <label className="block mb-2 font-semibold text-gray-700">
                Mobile Number:
            </label>
            <input
                type="number"
                name="number"
                id="number"
                value={number}
                onChange={(e) => {
                setNumber(e.target.value)
                setError("")
                }}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
            />
            </div>
            <div>
            <label className="block mb-2 font-semibold text-gray-700">
                Password:
            </label>
            <input
                type="password"
                name="Password"
                id="Password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                    setError("")
                }}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
            />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
            type="submit"
            className="w-full px-4 py-2 mt-4 font-semibold text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:shadow-outline-gray"
            >
            Sign up
            </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/Cu/login" className="text-blue-500 hover:text-blue-700">
            Sign In
            </a>
        </p>
        </div>
       </div>
      </div>
    </div>
  );
};

export default CuSignupForm;