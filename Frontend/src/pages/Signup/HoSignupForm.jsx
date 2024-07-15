import React, { useState , useContext} from "react";
import { useNavigate } from "react-router-dom";
import signup from "../../assets/images/signup.avif";

const HoSignupForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  
  
  const navigate = useNavigate();
  const handlesubmit = async (event) => {
    event.preventDefault();
    
    if (!name || !email || !password || !number) {
      setError("Please fill all the fields.");
      return;
    }
    const csrfToken = localStorage.getItem('csrfToken');
    console.log(csrfToken)
    try {
      const response = await fetch(`http://localhost:5000/Ho/signup`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          'X-CSRF-Token': csrfToken
       },
        body: JSON.stringify({ name, email, password ,number}),
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

      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user-houseowner", JSON.stringify(data.user));

      navigate("/Ho/Dashboard");
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col w-full max-w-4xl p-6 bg-white border border-gray-300 rounded-lg shadow-md md:flex-row">
        <div className="md:w-1/2">
          <img
            src={signup}
            alt="signup"
            className="object-cover w-full h-full rounded-l-lg"
          />
        </div>
        <div className="p-8 md:w-1/2">
          <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">Admin Sign Up</h1>
          <form onSubmit={handlesubmit}>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-700" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-700" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-700" htmlFor="number">Mobile Number</label>
              <input
                type="text"
                id="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-700" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            {error && <p className="mb-4 text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/Ho/login" className="text-blue-500 hover:text-blue-700">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HoSignupForm;