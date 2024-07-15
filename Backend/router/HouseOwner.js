const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { HouseOwner, Room, Booking } = require('../models');
const passport = require('passport');
const saltRounds = 10;
const jwtSecret = "683dd20d4bb0c4ebd7a44130c4f1b0020cce0405a71d4ab25708b61981d75b7247a9b274d3994d1954d52fd3888c986ddebc187cf4b2e5c63737caf94da5c0c4";

if (!jwtSecret) {
  throw new Error("JWT_SECRET environment variable is not set");
}

// Function to generate JWT
function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1d' });
}

// HouseOwner signup route
router.post('/signup', async (req, res) => {
  const { name, email, number, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const existingUser = await HouseOwner.findOne({ where: { email } });
    const existingUser1 = await HouseOwner.findOne({ where: { mobile_number: number } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }
    if (existingUser1) {
      return res.status(400).json({ message: 'Mobile Number is already registered' });
    }

    const newUser = await HouseOwner.create({
      owner_name: name,
      email,
      mobile_number: number,
      password: hashedPassword,
    });

    console.log('New user created:', newUser); 
    req.login(newUser, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to log in after registration' });
      }

      const token = generateToken(newUser);

      res.status(200).json({
        message: "Registration and login successful",
        token,
        user: {
          id: newUser.id,
          owner_name: newUser.owner_name,
          email: newUser.email,
          mobile_number: newUser.mobile_number,
        },
      });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register user" });
  }
});

// HouseOwner login route
router.post('/login', passport.authenticate('houseowner-local'), (req, res) => {
  console.log('User authenticated:', req.user);

  const token = generateToken(req.user);

  res.json({
    message: 'Login successful',
    token,
    user: req.user,
  });
});

// Portfolio route
router.get('/portfolio/:ownerId', async (req, res) => {
  const ownerId = req.params.ownerId;
  console.log(ownerId);

  try {
    const rooms = await Room.findAll({ where: { owner_id: ownerId } });

    if (!rooms.length) {
      return res.status(404).json({ message: 'No rooms found for this house owner' });
    }

    const roomIds = rooms.map(room => room.id);
    const bookings = await Booking.findAll({
      where: {
        room_id: roomIds
      }
    });

    const totalEarnings = bookings.reduce((sum, booking) => sum + parseFloat(booking.total_amount), 0).toFixed(2);

    const totalDaysBooked = bookings.reduce((sum, booking) => {
      const duration = (new Date(booking.check_out_date) - new Date(booking.check_in_date)) / (1000 * 60 * 60 * 24);
      return sum + duration;
    }, 0);

    const averageBookingDuration = (totalDaysBooked / (bookings.length || 1)).toFixed(2);

    const roomBookingCounts = {};
    bookings.forEach(booking => {
      roomBookingCounts[booking.room_id] = (roomBookingCounts[booking.room_id] || 0) + 1;
    });

    const mostBookedRoomId = Object.keys(roomBookingCounts).reduce((a, b) => roomBookingCounts[a] > roomBookingCounts[b] ? a : b, null);
    const mostBookedRoom = rooms.find(room => room.id == mostBookedRoomId);

    const totalGuests = new Set(bookings.map(booking => booking.customer_id)).size;

    const earningsPerRoom = rooms.map(room => {
      const roomBookings = bookings.filter(booking => booking.room_id === room.id);
      const roomEarnings = roomBookings.reduce((sum, booking) => sum + parseFloat(booking.total_amount), 0).toFixed(2);
      return {
        room_name: room.room_name,
        earnings: roomEarnings
      };
    });

    const portfolioDetails = {
      total_earnings: parseFloat(totalEarnings),
      total_bookings: bookings.length,
      total_rooms: rooms.length,
      average_booking_duration: parseFloat(averageBookingDuration),
      most_booked_room: mostBookedRoom ? {
        room_id: mostBookedRoom.id,
        room_name: mostBookedRoom.room_name,
        bookings: roomBookingCounts[mostBookedRoom.id]
      } : null,
      total_guests: totalGuests,
      earnings_per_room: earningsPerRoom
    };

    res.status(200).json({
      message: 'Portfolio details retrieved successfully',
      portfolio: portfolioDetails
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve portfolio details' });
  }
});


module.exports = router;
