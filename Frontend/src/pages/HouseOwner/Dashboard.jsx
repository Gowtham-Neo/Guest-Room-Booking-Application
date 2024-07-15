import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import classNames from 'classnames';
import AddHouse from './House/AddHouse';
import UpdateHouse from './House/UpdateHouse';
import AddRoom from './Room/AddRoom';
import UpdateRoom from './Room/UpdateRoom';
import { GiHouse } from "react-icons/gi";
import { HiLocationMarker } from "react-icons/hi";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const Dashboard = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingH, setLoadingH] = useState(true);
  
  const [isAddHouseOpen, setIsAddHouseOpen] = useState(false);
  const [isUpdateHouseOpen, setIsUpdateHouseOpen] = useState(false);
  const [houseToUpdate, setHouseToUpdate] = useState("");
  
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [isUpdateRoomOpen, setIsUpdateRoomOpen] = useState(false);
  const [roomToUpdate, setRoomToUpdate] = useState("");
  
  const [houseId, setHouseId] = useState();
  const [roomId, setRoomId] = useState();
  const csrfToken = localStorage.getItem('csrfToken');
  
  
  const navigate=useNavigate()
  
  const owner_id = JSON.parse(localStorage.getItem("user-houseowner")).id;
  useEffect(() => {
    if (!owner_id) {
      console.error('Owner data not found in localStorage');
      navigate(`/Ho/login`);
      return;
    }
    console.log(owner_id)
    fetchHouses();
  }, []);
  
  const profile = [
    { name: "Portfolio", href: `/Ho/portfolio` },
    { name: "Log Out", href: "/logout" },
  ];
  const fetchHouses = async () => {
    
   
  
    try {
      const response = await fetch(`${BACKEND_URL}/house/${owner_id}`);
      const data = await response.json();
      console.log('API Response:', data); // Log the API response to check its structure

      
      setHouses(data);
      console.log(houses)
      setLoading(false);
      setLoadingH(false)
    } catch (error) {
      console.error('Error fetching houses:', error);
    }
  };

  const handleAddHouse = async (formData) => {
    setLoadingH(true) 
    try {
      const response = await fetch(`${BACKEND_URL}/house/register`, {
        method: 'POST',
        headers: {
          'X-CSRF-Token': csrfToken
        },
        body: formData
      });
      const result = await response.json();
      console.log('Response:', result);
      fetchHouses()
      
    } catch (error) {
      console.error('Error adding house:', error);
    }
  };

  const handleUpdateHouse = async (houseId, updatedHouse) => {
    try {
      const response=await fetch(`${BACKEND_URL}/house/${houseId}`, {
        method: 'PUT',
        headers: {
          'X-CSRF-Token': csrfToken
        },
        body: updatedHouse
      });
      const result = await response.json();
      console.log('Response:', result); 
      fetchHouses();
      setLoadingH(true) 
    } catch (error) {
      console.error('Error updating house:', error);
    }
  };

  const handleDeleteHouse = async (houseId) => {
    try {
      await fetch(`${BACKEND_URL}/house/${houseId}`, {
        method: 'DELETE',
        headers: {
          
          'X-CSRF-Token': csrfToken
        },
      });
      fetchHouses();
      setLoadingH(true) 
    } catch (error) {
      console.error('Error deleting house:', error);
    }
  };

  const handleAddRoom = async (formData) => {
    setLoadingH(true) 
    console.log('Sending room data:', formData);
    try {
      const response = await fetch(`${BACKEND_URL}/house/${houseId}/room`, {
        method: 'POST',
        headers: {
          'X-CSRF-Token': csrfToken,
        },
        body: formData
      });
      const result = await response.json();
      console.log('Response:', result); 
      fetchHouses();
      
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };
  
  const handleUpdateRoom = async ( formData) => {
    try {
      const response = await fetch(`${BACKEND_URL}/house/${houseId}/room/${roomId}`, {
        method: 'PUT',
        headers: {
          'X-CSRF-Token': csrfToken,
        },
        body: formData,
      });
      const result = await response.json();
      console.log('Response:', result); 
      fetchHouses();
      setLoadingH(true) 
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };
  

  const handleDeleteRoom = async (houseId, roomId) => {
    try {
      await fetch(`${BACKEND_URL}/house/${houseId}/room/${roomId}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': csrfToken
        },
      });
      fetchHouses();
      setLoadingH(true) 
    } catch (error) {
      console.error('Error deleting room:', error);
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
        <h2 className="mt-16 mb-6 text-2xl font-bold">Houses:</h2>
        
       {houses.map((house) => (
        <div key={house.id} className="mb-6">
          <div className="p-6 bg-white rounded shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex flex-row"> <GiHouse className="text-2xl font-semibold text-blue-500"/>
                <h3 className="ml-2 font-serif text-xl font-bold">  {house.house_name} </h3>
                </div>
                <div className="flex flex-row">
                <HiLocationMarker className="text-2xl text-red-500"/>
                <p>{house.address}</p>
                </div>
              </div>
              <div className="flex">
                    <a
                      className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded"
                      href={`/houseview/${house.id}`}
                    >
                      View
                    </a>
                <button
                  className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded"
                  onClick={() => {
                    setHouseToUpdate(house);
                    setIsUpdateHouseOpen(true);
                  }}
                >
                  Update
                </button>
                <button
                  className="px-4 py-2 font-bold text-white bg-red-500 rounded"
                  onClick={() => handleDeleteHouse(house.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div>
            <h2 className="text-xl font-bold ">Rooms:</h2>
              {house.rooms && house.rooms.map((room) => (
                <div key={room.id} className="flex items-center justify-between p-4 mb-2 bg-gray-100 rounded shadow">
                  <div>
                    <h4 className="font-serif text-lg font-bold">{room.room_name}</h4>
                    <p className="flex flex-row">
                      Rent: 
                      <div className="flex flex-row ml-2">
                      <FaRupeeSign className="mt-1"/>
                      {room.rent_amount}
                      </div>
                    </p>
                  </div>
                  <div className="flex">
                    <a
                      className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded"
                      href={`/house/${house.id}/room/${room.id}`}
                    >
                      View
                    </a>
                    <button
                      className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded"
                      onClick={() => {
                        setRoomToUpdate(room);
                        setIsUpdateRoomOpen(true);
                        setHouseId(room.house_id)
                        setRoomId(room.id)
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="px-4 py-2 font-bold text-white bg-red-500 rounded"
                      onClick={() => handleDeleteRoom(house.id, room.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="px-4 py-2 mt-4 font-bold text-white bg-green-500 rounded"
              onClick={() => {
                setHouseToUpdate(house);
                setHouseId(house.id)
                setIsAddRoomOpen(true);
              }}
            >
              Add New Room
            </button>
          </div>
        </div>
      ))}
      {loadingH && (<p className="mb-8 text-xl">Fetching...</p>)}
      <button
          className="px-4 py-2 mb-10 font-bold text-white bg-green-500 rounded"
          onClick={() => setIsAddHouseOpen(true)}
      >
        Add New House
      </button>
      </div>
    </div>

    <AddHouse
      isOpen={isAddHouseOpen}
      onClose={() => setIsAddHouseOpen(false)}
      onAddHouse={handleAddHouse}
    />
    <UpdateHouse
      isOpen={isUpdateHouseOpen}
      onClose={() => setIsUpdateHouseOpen(false)}
      house={houseToUpdate}
      onUpdateHouse={handleUpdateHouse}
    />

    
    <AddRoom
      isOpen={isAddRoomOpen}
      onClose={() => setIsAddRoomOpen(false)}
      onAddRoom={handleAddRoom}
      houseId={houseId}
    />
    <UpdateRoom
      isOpen={isUpdateRoomOpen}
      onClose={() => setIsUpdateRoomOpen(false)}
      initialRoomData={roomToUpdate}
      roomId={roomId}
      houseId={houseId}
      ownerId={owner_id}
      onUpdateRoom={handleUpdateRoom}
    />
  </div>
  );
};

export default Dashboard;
