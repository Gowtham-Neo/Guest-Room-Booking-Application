import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signin from "../../assets/images/signin.avif";

const HoSigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handlesubmit = async (event) => {
    event.preventDefault();
    
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }
    const csrfToken = localStorage.getItem('csrfToken');
    console.log(csrfToken)
    try {
      const response = await fetch(`http://localhost:5000/Ho/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          'X-CSRF-Token': csrfToken
       },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("Invalid credentials !");
        setTimeout(() => {
          setError(""); 
        }, 3000); 
        throw new Error("Sign-in failed");
      }

      const data = await response.json();
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user-houseowner", JSON.stringify(data.user));

      console.log("Sign-in successful");
      navigate("/Ho/Dashboard");
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col-reverse w-full max-w-xl px-6 py-8 bg-white border-4 border-gray-300 border-dotted rounded-lg shadow-md md:flex-row">
        <div className="p-4 md:w-full md:border-r ">
          <h1 className="mb-8 text-3xl font-bold text-center text-gray-800 ">
          Admin Sign In
          </h1>
          <div>
            <form onSubmit={handlesubmit}>
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
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
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
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
                Sign In
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/Ho/signup" className="text-blue-500 hover:text-blue-700">
                Sign Up
              </a>
            </p>
          </div>
        </div>
          <div className="md:w-full">
          <img
            src={signin}
            alt="signin"
            className="object-cover w-full h-full rounded-r-lg"
          />
          </div>
      </div>
    </div>
  );
};

export default HoSigninForm;