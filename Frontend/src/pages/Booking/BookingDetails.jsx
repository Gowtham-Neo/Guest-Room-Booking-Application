import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaHome } from 'react-icons/fa';
import Header from '../Guest/Header';
import Footer from '../Home/Footer';
import { MdPermIdentity } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const BookingDetails = () => {
const [bookings, setBookings] = useState([]);
const customer_id = JSON.parse(localStorage.getItem('user-customer')).id;

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/booking/guest/${customer_id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="container flex-grow py-10 mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center">Your Booking Details</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div key={booking.id} className="p-4 border rounded shadow-2xl">
              <div className="flex items-center mb-4">
                <FaHome className="mr-2 text-blue-500" />
                <h2 className="font-serif text-xl font-bold">{booking.Room ? booking.Room.room_name : 'Room Name Not Available'}</h2>
              </div>

              <div className="flex items-center mb-2">
                <FaCalendarAlt className="mr-2 text-red-500" />
                <span>{new Date(booking.check_in_date).toLocaleDateString()} - {new Date(booking.check_out_date).toLocaleDateString()}</span>
              </div>
              <p className="mb-2"><MdPermIdentity className='inline-block mb-1 text-xl'/>
              Booking ID: {booking.id}</p>
              <p className="mb-2"><FaRupeeSign className="inline-block mb-1" />Total Price: {booking.total_amount}<FaRupeeSign className="inline-block mb-1" /></p>
              <p className="mb-2">Booking Status: {booking.booking_status ? 'Booked' : 'Not Booked'} <IoMdCheckmark className="inline-block mb-1"/> </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingDetails;
