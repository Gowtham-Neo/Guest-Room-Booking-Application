import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaArrowLeft, FaArrowRight, FaHome } from 'react-icons/fa';
import Header from './Header';
import Footer from '../Home/Footer';
import backgroundImage from '../../assets/images/Hero.webp'; // Replace with your actual background image path
import { MdDescription } from "react-icons/md";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";


const GuestRoomBooking = () => {
  const [houses, setHouses] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentImageIndexH, setCurrentImageIndexH] = useState({});
  const [currentImageIndexR, setCurrentImageIndexR] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchHouses();
    fetchRooms();
  }, []);

  const fetchHouses = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/house`);
      const data = await response.json();
      setHouses(data);
      setCurrentImageIndexH(data.reduce((acc, house) => ({ ...acc, [house.id]: 0 }), {}));
    } catch (error) {
      console.error('Error fetching houses:', error);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/rooms`);
      const data = await response.json();
      setRooms(data);
      setCurrentImageIndexR(data.reduce((acc, room) => ({ ...acc, [room.id]: 0 }), {}));
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredHouses = houses.filter(house =>
    house.house_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRooms = rooms.filter(room =>
    room.room_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNextImageH = (houseId) => {
    setCurrentImageIndexH((prevState) => ({
      ...prevState,
      [houseId]: (prevState[houseId] + 1) % houses.find(house => house.id === houseId).photos.length,
    }));
  };

  const handlePrevImageH = (houseId) => {
    setCurrentImageIndexH((prevState) => ({
      ...prevState,
      [houseId]: (prevState[houseId] - 1 + houses.find(house => house.id === houseId).photos.length) % houses.find(house => house.id === houseId).photos.length,
    }));
  };

  const handleNextImageR = (roomId) => {
    setCurrentImageIndexR((prevState) => ({
      ...prevState,
      [roomId]: (prevState[roomId] + 1) % rooms.find(room => room.id === roomId).photos.length,
    }));
  };

  const handlePrevImageR = (roomId) => {
    setCurrentImageIndexR((prevState) => ({
      ...prevState,
      [roomId]: (prevState[roomId] - 1 + rooms.find(room => room.id === roomId).photos.length) % rooms.find(room => room.id === roomId).photos.length,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-center bg-cover">
      <Header />
      <div className="flex-grow">
        <div className="flex items-center justify-center py-10 bg-gray-100 bg-opacity-75">
          <div className="container p-4">
            <section className="bg-center bg-cover h-96" style={{ backgroundImage: `url(${backgroundImage})` }}>
              <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
                <input
                  type="text"
                  className="p-2 border rounded w-60"
                  placeholder="Search by room or house..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <button
                  className="px-4 py-2 ml-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                  onClick={() => handleSearch}
                >
                  Search
                </button>
              </div>
            </section>

            <div className="mt-10 mb-8">
              <h2 className="mb-4 text-2xl font-bold text-center">Houses</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredHouses.map((house) => (
                  <div key={house.id} className="p-4 border rounded shadow-2xl">
                    <div className="relative h-64 mb-4">
                      {house.photos && house.photos.length > 0 && (
                        <img
                          src={`${BACKEND_URL}${house.photos[currentImageIndexH[house.id]]}`}
                          alt={house.house_name}
                          className="object-cover w-full h-full rounded"
                        />
                      )}
                      <button
                        onClick={() => handlePrevImageH(house.id)}
                        className="absolute left-0 px-2 py-1 text-sm text-white transform -translate-y-1/2 bg-gray-800 rounded top-1/2"
                      >
                        <FaArrowLeft />
                      </button>
                      <button
                        onClick={() => handleNextImageH(house.id)}
                        className="absolute right-0 px-2 py-1 text-sm text-white transform -translate-y-1/2 bg-gray-800 rounded top-1/2"
                      >
                        <FaArrowRight />
                      </button>
                    </div>
                    <h3 className="text-xl font-bold"><FaHome className="inline-block mr-2 -mt-1" />{house.house_name}</h3>
                    <p className="flex items-center mb-2">
                    <FaStar className="inline-block mb-1 mr-2" />Rating:  {house.rating}<FaStar className="ml-1 text-yellow-500" />    
                    </p>
                    <p><MdDescription className='inline-block -mt-1'/>{house.description}</p>
                    <button
                      className="px-4 py-2 mt-4 mr-2 font-bold text-black border border-black rounded"
                      onClick={() => navigate(`houseDetials/${house.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                ))}
                {filteredHouses=="" && (
                    <p className='text-2xl font-bold'>No Houses available!</p>
                )}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-center">Rooms</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredRooms.map((room) => (
                  <div key={room.id} className="p-4 border rounded shadow-2xl">
                    <div className="relative h-64 mb-4">
                      {room.photos && room.photos.length > 0 && (
                        <img
                          src={`${BACKEND_URL}${room.photos[currentImageIndexR[room.id]]}`}
                          alt={room.room_name}
                          className="object-cover w-full h-full rounded"
                        />
                      )}
                      <button
                        onClick={() => handlePrevImageR(room.id)}
                        className="absolute left-0 px-2 py-1 text-sm text-white transform -translate-y-1/2 bg-gray-800 rounded top-1/2"
                      >
                        <FaArrowLeft />
                      </button>
                      <button
                        onClick={() => handleNextImageR(room.id)}
                        className="absolute right-0 px-2 py-1 text-sm text-white transform -translate-y-1/2 bg-gray-800 rounded top-1/2"
                      >
                        <FaArrowRight />
                      </button>
                    </div>
                    <h3 className="text-xl font-bold"><FaHome className="inline-block mr-2 -mt-1" />{room.room_name}</h3>
                    <p className="flex items-center mb-2">
                    <FaStar className="inline-block mb-1 mr-2" />Rating:  {room.rating} <FaStar className="ml-1 text-yellow-500" />
                    </p>
                    <p><MdDescription className='inline-block -mt-1'/>{room.description}</p>
                    <button className="px-4 py-2 mt-4 mr-2 font-bold text-white bg-green-500 rounded" onClick={()=>navigate(`/booking/room/${room.id}`)}>Book Room</button>

                  </div>
                ))}
                {filteredRooms=="" && (
                    <p className='text-2xl font-bold'>No rooms available!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GuestRoomBooking;
