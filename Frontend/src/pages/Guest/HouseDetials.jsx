import React, { useState, useEffect } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import Header from './Header';
import { FaArrowLeft ,FaArrowRight, FaStar } from 'react-icons/fa';
import { FaBed, FaHome, FaList, FaMapMarkerAlt, FaRulerCombined, FaDollarSign, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { IoPeopleSharp } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdDescription } from "react-icons/md";
import Footer from "../Home/Footer"

const HouseDetails = () => {
  const { houseId } = useParams();
  const [house, setHouse] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [currentImageIndexH, setCurrentImageIndexH] = useState(0);
  const [currentImageIndexR, setCurrentImageIndexR] = useState({});

  const navigate=useNavigate()

  useEffect(() => {
    fetchHouseAndRoomDetails();
  }, [houseId]);

  const fetchHouseAndRoomDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/house/houseview/${houseId}`);
      const data = await response.json();
      setHouse(data.house);
      setRooms(data.rooms);
      setCurrentImageIndexR(data.rooms.reduce((acc, room) => ({ ...acc, [room.id]: 0 }), {}));
    } catch (error) {
      console.error('Error fetching house and room details:', error);
    }
  };

  const handleNextImageH = () => {
    if (house && house.photos) {
      setCurrentImageIndexH((prevIndex) => (prevIndex + 1) % house.photos.length);
    }
  };

  const handlePrevImageH = () => {
    if (house && house.photos) {
      setCurrentImageIndexH((prevIndex) => (prevIndex - 1 + house.photos.length) % house.photos.length);
    }
  };

  const handleNextImageR = (roomId) => {
    setCurrentImageIndexR((prevIndex) => ({
      ...prevIndex,
      [roomId]: (prevIndex[roomId] + 1) % rooms.find(room => room.id === roomId).photos.length
    }));
  };

  const handlePrevImageR = (roomId) => {
    setCurrentImageIndexR((prevIndex) => ({
      ...prevIndex,
      [roomId]: (prevIndex[roomId] - 1 + rooms.find(room => room.id === roomId).photos.length) % rooms.find(room => room.id === roomId).photos.length
    }));
  };

  if (!house) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="relative ml-12 mr-12 h-3/6">
        {house.photos && house.photos.length > 0 && (
          <img
            src={`http://localhost:5000${house.photos[currentImageIndexH]}`}
            alt={house.house_name}
            className="object-cover w-full h-96"
          />
        )}
        <button
          onClick={handlePrevImageH}
          className="absolute left-0 px-2 py-1 text-sm text-white transform -translate-y-1/2 bg-gray-800 rounded top-1/2"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={handleNextImageH}
          className="absolute right-0 px-2 py-1 text-sm text-white transform -translate-y-1/2 bg-gray-800 rounded top-1/2"
        >
          <FaArrowLeft />
        </button>
      </div>
      <div className="container p-4 mx-auto">
        <h2 className="mb-4 font-serif text-3xl font-bold">{house.house_name}</h2>
        <div className="flex flex-row mb-2 text-lg font-semibold"><FaLocationDot className='mt-1'/>Address: {house.address}</div>
        <div className="flex flex-row mb-2 text-lg font-semibold"><MdDescription className='mt-1'/>Description: {house.description}</div>
        <div className="flex flex-row items-center font-semibold mb-2flex-row">
        <FaStar/>
          Rating:  {house.rating} <FaStar className="ml-1 text-yellow-400" />
        </div>

        <div className="mt-8">
          <h3 className="mb-4 text-2xl font-bold">Rooms</h3>
          {rooms.map((room) => (
            <div key={room.id} className="p-4 mb-8 border rounded shadow-2xl">
              <div className="relative mb-4 h-96">
                {room.photos && room.photos.length > 0 && (
                  <img
                    src={`http://localhost:5000${room.photos[currentImageIndexR[room.id]]}`}
                    alt={room.room_name}
                    className="object-cover w-full h-full rounded"
                  />
                )}
                <button
                  onClick={() => handlePrevImageR(room.id)}
                  className="absolute left-0 px-2 py-1 text-sm text-white transform -translate-y-1/2 bg-gray-800 rounded top-1/2"
                >
                  <FaAngleLeft />
                </button>
                <button
                  onClick={() => handleNextImageR(room.id)}
                  className="absolute right-0 px-2 py-1 text-sm text-white transform -translate-y-1/2 bg-gray-800 rounded top-1/2"
                >
                  <FaAngleRight />
                </button>
              </div>
              <h3 className="text-2xl font-bold"><FaHome className="inline-block mr-2 -mt-1" />{room.room_name}</h3>
              <p className="mt-4 mb-2 text-lg"><MdDescription className='inline-block -mt-1'/><span className='font-bold'>Description:</span> {room.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <p className="mb-2 text-lg"><IoPeopleSharp className="inline-block mr-2" /><span className='font-bold'>Max Guests:</span>  {room.max_guest}</p>
                <p className="mb-2 text-lg"><FaRulerCombined className="inline-block mr-2" /><span className='font-bold'>Floor Size:</span>  {room.floor_size} sqft</p>
                <p className="mb-2 text-lg"><FaBed className="inline-block mr-2" /><span className='font-bold'>Beds:</span>  {room.beds_count}</p>
                <p className="mb-2 text-lg"><FaList className="inline-block mr-2" /><span className='font-bold'>Amenities: </span> {room.amenities.join(', ')}</p>
                <p className="mb-2 text-lg"><FaList className="inline-block mr-2" /><span className='font-bold'>Minimum Stay:</span>  {room.min_stay} Day</p>
                <p className="mb-2 text-lg"><FaList className="inline-block mr-2" /><span className='font-bold'>Maximum Stay:</span>  {room.max_stay} Days</p>
                <p className="mb-2 text-lg"><FaRupeeSign className="inline-block mr-2" /><span className='font-bold'>Rent Amount: </span> {room.rent_amount}<FaRupeeSign className="inline-block mb-1 mr-2" /></p>
                <p className="mb-2 text-lg"><FaStar className="inline-block mb-1 mr-2" /><span className='font-bold'>Rating: </span> {room.rating} <FaStar className="inline-block mb-1 mr-2 text-yellow-400" /></p>
              </div>
              <button className="px-4 py-2 mt-4 mr-2 font-bold text-white bg-green-500 rounded" onClick={()=>navigate(`/booking/room/${room.id}`)}>Book Room</button>

            </div>
            
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default HouseDetails;
