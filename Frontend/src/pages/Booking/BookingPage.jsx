import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Header from '../Guest/Header';
import AvailabilityCalendar from './AvailabilityCalendar';
import { FaArrowLeft ,FaArrowRight, FaStar } from 'react-icons/fa';
import { FaBed, FaHome, FaList, FaMapMarkerAlt, FaRulerCombined, FaDollarSign, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { IoPeopleSharp } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdDescription } from "react-icons/md";
import Footer from "../Home/Footer"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const BookingPage = () => {
  const { roomId } = useParams();
  console.log(roomId)
  const [room, setRoom] = useState(null);
  const [total_amount, setTotalAmount] = useState('');
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [availability, setAvailability] = useState([]);
  const [check_in_date, setCheckInDate] = useState('');
  const [check_out_date, setCheckOutDate] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');
  const csrfToken = localStorage.getItem('csrfToken');

  const customer_id = JSON.parse(localStorage.getItem('user-customer')).id;
    const navigate=useNavigate()
  useEffect(() => {
    fetchRoomDetails();
    if (!customer_id) {
      setError('Login to Book your room');
      navigate("/Ho/login")
    }
  }, [roomId]);

  const fetchRoomDetails = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/room/${roomId}`);
      const data = await response.json();
      setRoom(data);
      setTotalAmount(data.rent_amount);
      const response1 = await fetch(`${BACKEND_URL}/availability/${roomId}`);
      const data1 = await response1.json();
      setAvailability(
        data1.bookings.map((booking) => ({
          checkIn: new Date(booking.check_in_date),
          checkOut: new Date(booking.check_out_date),
        }))
      );
    } catch (error) {
      console.error('Error fetching room details:', error);
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

  const handleBooking = async (e) => {
    e.preventDefault();
    console.log('Check-In Date:', check_in_date);
    console.log('Check-Out Date:', check_out_date);

    // Check if the selected dates overlap with existing bookings
    const overlaps = availability.some(booking => {
      const bookedCheckIn = new Date(booking.checkIn).getTime();
      const bookedCheckOut = new Date(booking.checkOut).getTime();
      const selectedCheckIn = new Date(check_in_date).getTime();
      const selectedCheckOut = new Date(check_out_date).getTime();
      
      return (
        (selectedCheckIn >= bookedCheckIn && selectedCheckIn < bookedCheckOut) ||
        (selectedCheckOut > bookedCheckIn && selectedCheckOut <= bookedCheckOut) ||
        (selectedCheckIn <= bookedCheckIn && selectedCheckOut >= bookedCheckOut)
      );
    });

    if (overlaps) {
      setError('The dates are reserved. Please choose other dates.');
      setBookingStatus('');
      return;
    }

    // Check if the selected dates meet the room's minimum and maximum stay requirements
    const minStay = room.min_stay;
    const maxStay = room.max_stay;
    const selectedCheckInDate = new Date(check_in_date);
    const selectedCheckOutDate = new Date(check_out_date);
    const stayDuration = (selectedCheckOutDate - selectedCheckInDate) / (1000 * 60 * 60 * 24);

    if (stayDuration < minStay || stayDuration > maxStay) {
      setError(`Stay duration must be between ${minStay} and ${maxStay} nights.`);
      setBookingStatus('');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/${room.id}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ check_in_date, check_out_date, customer_id, total_amount }),
      });

      if (!response.ok) {
        throw new Error('Failed to book room');
      }

      setBookingStatus('Booked successful!');
      setError('');
      fetchRoomDetails(); 
      console.log(await response.json())
    } catch (error) {
      console.error('Error booking room:', error);
      setError('Failed to book room');
      setBookingStatus('');
    }
  };

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container p-4 mx-auto">
        <div className="flex">
          <div className="w-3/4">
            <div className="relative mb-4 h-96">
              {room.photos && room.photos.length > 0 && (
                <img
                  src={`${BACKEND_URL}${room.photos[currentImageIndex]}`}
                  alt={room.room_name}
                  className="object-cover w-full h-full rounded"
                />
              )}
              <button
                onClick={handlePrevImage}
                className="absolute left-0 px-2 py-1 text-sm text-white transform -translate-y-1/2 bg-gray-800 rounded top-1/2"
              >
                <FaArrowLeft/>
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-0 px-2 py-1 text-sm text-white transform -translate-y-1/2 bg-gray-800 rounded top-1/2"
              >
                <FaArrowRight/>
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
            
          </div>
          <div className="w-1/4 pl-4">
            <h3 className="mb-4 text-2xl font-bold">Availability</h3>
            <div className="mb-4">
              <AvailabilityCalendar availability={availability} />
            </div>
            <form onSubmit={handleBooking}>
              <label className="block mb-2 text-lg">Check-In Date</label>
              <input
                type="date"
                className="w-full p-2 mb-4 border rounded"
                value={check_in_date}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
              <label className="block mb-2 text-lg">Check-Out Date</label>
              <input
                type="date"
                className="w-full p-2 mb-4 border rounded"
                value={check_out_date}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
              {bookingStatus ? (
                <button className="w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600" disabled>
                  {bookingStatus}
                </button>
              ) : (
                <button className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                  Book Now
                </button>
              )}
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default BookingPage;
