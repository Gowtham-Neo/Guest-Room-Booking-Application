import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { FaHome, FaDollarSign, FaBed, FaCalendarAlt, FaUserFriends, FaChartLine ,FaRupeeSign} from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import classNames from "classnames";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const Portfolio = () => {
  const [portfolioDetails, setPortfolioDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const profile = [
    { name: "Dashboard", href: "/Ho/Dashboard" },
    { name: "Log Out", href: "/logout" },
  ];

  useEffect(() => {
    fetchPortfolioDetails();
  }, []);

  const owner_id = JSON.parse(localStorage.getItem("user-houseowner")).id;

  const fetchPortfolioDetails = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/Ho/portfolio/${owner_id}`);
      const data = await response.json();
      setPortfolioDetails(data.portfolio);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching portfolio details:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Disclosure as="nav" className="fixed top-0 left-0 z-50 w-full p-4 bg-white border-b border-slate-200">
        {() => (
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between md:justify-between">
              <div className="flex items-center">
                <a href="/" className="font-serif font-bold md:text-2xl">
                  Guestify.in
                </a>
              </div>
              <div className="block">
                <div className="flex items-center ml-6">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex items-center p-1 text-black rounded-full hover:text-gray-600">
                        <UserCircleIcon className="w-5 h-5 md:h-6 md:w-6" aria-hidden="true" />
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
                        {profile.map((item) => (
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


      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="fixed w-64 h-full p-6 text-white bg-gray-800">
        <h1 className="mb-8 font-serif text-2xl font-bold mt-14">Management</h1>
        <ul>
          <li className="mb-4">
            <a href="/Ho/Dashboard" className="text-lg"><MdDashboardCustomize className="inline-block mb-1"/>Dashboard</a>
          </li>
          <li className="mb-4">
            <a href="/Ho/portfolio" className="text-lg"><BsGraphUpArrow className="inline-block mb-1"/>Portfolio</a>
          </li>
        </ul>
      </div>

        {/* Main Content */}
        <div className="flex-1 p-6 ml-64">
          <h2 className="mb-6 text-2xl font-bold">Portfolio Details:</h2>
          <div className="p-6 bg-white rounded shadow-2xl">
            {portfolioDetails ? (
              <div className="mb-4">
                <div className="flex items-center mb-4">
                  <FaRupeeSign  className="mr-2 text-green-500" />
                  <h3 className="text-lg font-bold">Total Earnings: ${portfolioDetails.total_earnings || 0}</h3>
                </div>
                <div className="flex items-center mb-4">
                  <FaChartLine className="mr-2 text-blue-500" />
                  <p>Total Bookings: {portfolioDetails.total_bookings || 0}</p>
                </div>
                <div className="flex items-center mb-4">
                  <FaBed className="mr-2 text-yellow-500" />
                  <p>Total Rooms: {portfolioDetails.total_rooms || 0}</p>
                </div>
                <div className="flex items-center mb-4">
                  <FaCalendarAlt className="mr-2 text-red-500" />
                  <p>Average Booking Duration: {portfolioDetails.average_booking_duration || 0} days</p>
                </div>
                <div className="flex items-center mb-4">
                  <FaHome className="mr-2 text-purple-500" />
                  {portfolioDetails.most_booked_room ? (
                    <p>Most Booked Room: {portfolioDetails.most_booked_room.room_name} (Booked {portfolioDetails.most_booked_room.bookings} times)</p>
                  ) : (
                    <p>Most Booked Room: N/A</p>
                  )}
                </div>
                <div className="flex items-center mb-4">
                  <FaUserFriends className="mr-2 text-indigo-500" />
                  <p>Total Guests: {portfolioDetails.total_guests || 0}</p>
                </div>
              </div>
            ) : (
              <p>No portfolio details available.</p>
            )}
            <h3 className="mb-4 text-lg font-bold">Earnings per Room:</h3>
            <ul>
              {portfolioDetails?.earnings_per_room?.length > 0 ? (
                portfolioDetails.earnings_per_room.map((room) => (
                  <li key={room.room_name} className="flex items-center mb-2">
                    <FaRupeeSign className="mr-2 text-green-500" />
                    <p>{room.room_name}: {room.earnings}</p>
                  </li>
                ))
              ) : (
                <p>No earnings data available for rooms.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
