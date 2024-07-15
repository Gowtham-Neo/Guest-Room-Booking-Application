import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { UserCircleIcon , ChevronDownIcon} from "@heroicons/react/24/outline";
import { useEffect } from "react";
import classNames from 'classnames';
import Hero from "../../assets/images/Hero.webp"
import VerifiedRooms from "../../assets/images/VerifiedRooms.avif"
import EasyBooking from "../../assets/images/EasyBooking.webp"
import CustomerSupport from "../../assets/images/CustomerSupport.webp"
import Footer from "./Footer"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  



function Home() {
    const [csrfToken,setCsrfToken]=useState(localStorage.getItem('csrfToken') || "")
    const Login = [
    { name: "Admin Login", href: "/Ho/login" },
    { name: "Guest Login", href: "/Cu/login" },
  ];
  const Signup = [
    { name: "Admin Signup", href: "/Ho/signup" },
    { name: "Guest Signup", href: "/Cu/signup" },
  ];

  useEffect(() => {
    if(csrfToken == ""){
        const fetchCsrfToken = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/get-csrf-token`, {
                credentials: 'include'
            });
            const data = await response.json();
            console.log("Fetched CSRF token:", data.csrfToken);
            localStorage.setItem('csrfToken', data.csrfToken);
        } catch (error) {
            console.error("Error fetching CSRF token:", error);
        }
        };
        fetchCsrfToken();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <>
      <Disclosure as="nav" className="p-4 border-b border-slate-200">
        {({}) => (
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between md:justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  
                </div>
                <a href="/" className="font-serif font-bold md:text-2xl">
                    Guestify.in
                </a>
              </div>
              <div className="block">
                <div className="flex items-center ml-6">
                    <Menu as="div" className="relative ml-3">
                      <div>
                      <Menu.Button className="flex items-center p-1 text-black rounded-full hover:text-gray-600">
                          Login
                          <ChevronDownIcon
                            className="w-5 h-5 ml-1 md:h-6 md:w-6"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {Login.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-gray-700 text-white" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    <Menu as="div" className="relative ml-3">
                      <div>
                      <Menu.Button className="flex items-center p-1 text-black rounded-full hover:text-gray-600">
                        Sign-Up
                          <ChevronDownIcon
                            className="w-5 h-5 ml-1 md:h-6 md:w-6"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {Signup.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-gray-700 text-white" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  
                </div>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
    </>

      {/* Hero Section */}
      <section
        className="bg-center bg-cover h-96"
        style={{ backgroundImage: `url(${Hero})` }}     
     >
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <h2 className="font-serif text-5xl font-bold text-white">
            Welcome to <span className="text-6xl font-black text-amber-500">Guestify.in</span> 
          </h2>
        </div>
      </section>

      {/* About Section */}
      <section className="container px-6 py-16 mx-auto text-center">
        <h3 className="text-3xl font-bold text-gray-800">About Us</h3>
        <p className="mt-4 text-gray-600">
          Discover the best guest rooms for your stay. Whether you're a house
          owner looking to rent out your property or a guest seeking a
          comfortable room, we've got you covered.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container grid grid-cols-1 gap-8 px-6 mx-auto lg:grid-cols-3 sm:grid-cols-2">
          {/* Feature 1 */}
          <div className="text-center">
            <img
              src={EasyBooking}
              alt="Feature 1"
              className="object-cover w-full h-48 mx-auto rounded-lg shadow-md"
            />
            <h4 className="mt-4 text-2xl font-bold text-gray-800">
              Easy Booking
            </h4>
            <p className="mt-2 text-gray-600">
              Book your stay in just a few clicks. Our platform is user-friendly
              and efficient.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="text-center">
            <img
              src={VerifiedRooms}
              alt="Feature 2"
              className="object-cover w-full h-48 mx-auto rounded-lg shadow-md"
            />
            <h4 className="mt-4 text-2xl font-bold text-gray-800">
              Verified Rooms
            </h4>
            <p className="mt-2 text-gray-600">
              All rooms are verified for quality and comfort to ensure a
              pleasant stay.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="text-center">
            <img
              src={CustomerSupport}
              alt="Feature 3"
              className="object-cover w-full h-48 mx-auto rounded-lg shadow-md"
            />
            <h4 className="mt-4 text-2xl font-bold text-gray-800">
              Customer Support
            </h4>
            <p className="mt-2 text-gray-600">
              Our support team is available 24/7 to assist you with any queries
              or issues.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 text-center text-white bg-amber-300">
        <h3 className="text-3xl font-bold">Ready to Get Started?</h3>
        <p className="mt-4">
          Join us today and find the perfect room or start renting out your
          property.
        </p>
        <div className="mt-8 space-x-4">
          <a
            href="/Ho/login"
            className="px-4 py-2 bg-white rounded shadow text-amber-500"
          >
            Admin Login
          </a>
          <a
            href="/Cu/login"
            className="px-4 py-2 bg-white rounded shadow text-amber-500"
          >
            Guest Login
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
      
    </div>
  );
}

export default Home;
