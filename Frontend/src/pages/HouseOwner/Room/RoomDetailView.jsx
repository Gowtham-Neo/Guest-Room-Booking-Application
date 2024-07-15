import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBed, FaRulerCombined, FaClipboardList, FaCalendarAlt,FaRupeeSign, FaDollarSign, FaRegFileAlt, FaUsers, FaStar,FaArrowLeft,FaArrowRight } from 'react-icons/fa';
import Header from "../House/Header"
const parseParamsFromURL = (pathname) => {
  const parts = pathname.split('/');
  const house_id = parts[2];
  const room_id = parts[4];
  return { house_id, room_id };
};

const RoomDetailView = () => {
  const location = useLocation();
  const { house_id, room_id } = parseParamsFromURL(location.pathname);
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const csrfToken = localStorage.getItem('csrfToken');

  useEffect(() => {
    if (house_id && room_id) {
      const fetchRoomDetails = async () => {
        try {
          const response = await fetch(`http://localhost:5000/house/${house_id}/room/${room_id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setRoom(data);
        } catch (error) {
          console.error('Error fetching room details:', error);
          setError(error.message);
        }
      };

      fetchRoomDetails();
    } else {
      console.error('house_id or room_id is undefined');
      setError('Invalid house ID or room ID');
    }
  }, [house_id, room_id]);

  const deletePhoto = async (filename) => {
    try {
      const response = await fetch(`http://localhost:5000/house/${house_id}/room/${room_id}/photo`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ filename }),
      });

      if (response.ok) {
        const data = await response.json();
        setRoom(data.room);
        const currentIndex = room.photos.findIndex(photo => photo === filename);

        if (currentIndex === room.photos.length) {
          handlePrevImage();
        } else {
          handleNextImage();
        }
      } else {
        console.error('Failed to delete photo');
      }
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const handleNextImage = () => {
    if (room && room.photos) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % room.photos.length);
    }
  };

  const handlePrevImage = () => {
    if (room && room.photos) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + room.photos.length) % room.photos.length);
    }
  };

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container p-4 mx-auto">
        
        <div className="">
          <div>
            <h2 className="mb-4 text-3xl font-bold">{room.room_name}</h2>
            <div className="relative mb-4 h-96">
              {room.photos && room.photos.length > 0 ? (
                <>
                  <img src={`http://localhost:5000${room.photos[currentImageIndex]}`} alt={`Room ${currentImageIndex + 1}`} className="object-cover w-full h-full rounded" />
                  <button onClick={() => deletePhoto(room.photos[currentImageIndex])} className="absolute top-0 right-0 px-2 py-1 m-2 text-sm text-white bg-red-600 rounded">
                    Delete
                  </button>
                  <button onClick={handlePrevImage} className="absolute left-0 px-2 py-1 text-sm text-white transform -translate-y-1/2 bg-gray-800 rounded top-1/2">
                    <FaArrowLeft />
                  </button>
                  <button onClick={handleNextImage} className="absolute right-0 px-2 py-1 text-sm text-white transform -translate-y-1/2 bg-gray-800 rounded top-1/2">
                    <FaArrowRight />
                  </button>
                </>
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-200 rounded">
                  No photos available
                </div>
              )}
            </div>
          </div>
          
        </div>
        <div>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center">
                <FaRulerCombined className="mr-2 text-gray-600" />
                <p><strong>Floor Size:</strong> {room.floor_size} sqft</p>
              </div>
              <div className="flex items-center">
                <FaBed className="mr-2 text-gray-600" />
                <p><strong>Beds Count:</strong> {room.beds_count}</p>
              </div>
              <div className="flex items-center">
                <FaClipboardList className="mr-2 text-gray-600" />
                <p><strong>Amenities:</strong> {room.amenities.join(', ')}</p>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2 text-gray-600" />
                <p><strong>Minimum Stay:</strong> {room.min_stay} days</p>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2 text-gray-600" />
                <p><strong>Maximum Stay:</strong> {room.max_stay} days</p>
              </div>
              <div className="flex items-center">
              <FaRupeeSign className="inline-block mr-2 text-gray-600" />
                <p><strong>Rent Amount:</strong> {room.rent_amount} per day</p>
              </div>
              <div className="flex items-center">
                <FaRegFileAlt className="mr-2 text-gray-600" />
                <p><strong>Description:</strong> {room.description}</p>
              </div>
              <div className="flex items-center">
                <FaUsers className="mr-2 text-gray-600" />
                <p><strong>Maximum Guests:</strong> {room.max_guest}</p>
              </div>
              <div className="flex items-center">
                <FaStar className="mr-2 text-gray-600" />
                <p><strong>Rating:</strong> {room.rating} stars</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default RoomDetailView;