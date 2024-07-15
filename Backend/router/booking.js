const express = require('express');
const router = express.Router();
const { Booking, Room, Customer,House } = require('../models');
const { Op } = require('sequelize');

// Create a new booking
router.post('/:roomId/book', async (req, res) => {
    const room_id =req.params.roomId
  const { check_in_date, check_out_date, total_amount,customer_id, } = req.body;

  try {
    // Ensure room is available for the requested dates
    const room = await Room.findOne({
      where: { id: room_id },
      include: [{
        model: Booking,
        where: {
          [Op.or]: [
            {
              check_in_date: { [Op.between]: [check_in_date, check_out_date] }
            },
            {
              check_out_date: { [Op.between]: [check_in_date, check_out_date] }
            }
          ]
        },
        required: false
      }]
    });

    if (room.Bookings.length > 0) {
      return res.status(400).json({ message: 'Room is not available for the selected dates' });
    }

    const newBooking = await Booking.create({
      customer_id,
      room_id,
      check_in_date,
      check_out_date,
      total_amount,
      booking_status:true
    });

    res.status(201).json({
      message: 'Booking created successfully',
      booking: newBooking
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Failed to create booking' });
  }
});


// Get a specific booking by ID
router.get('/bookId/:booking_id', async (req, res) => {
    const booking_id = req.params.booking_id;
  
    try {
      const booking = await Booking.findByPk(booking_id);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      res.status(200).json(booking);
    } catch (error) {
      console.error(`Error fetching booking with ID ${booking_id}:`, error);
      res.status(500).json({ message: 'Failed to fetch booking' });
    }
  });
router.get('/booking', async (req, res) => {
    const booking_id = req.params.booking_id;
  
    try {
      const booking = await Booking.findAll();
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      res.status(200).json(booking);
    } catch (error) {
      console.error(`Error fetching booking with ID ${booking_id}:`, error);
      res.status(500).json({ message: 'Failed to fetch booking' });
    }
  });
  router.get('/booking/guest/:guestId', async (req, res) => {
    const customer_id = req.params.guestId;
    console.log(customer_id)
    try {
      const bookings = await Booking.findAll({
        where: { customer_id: customer_id },
        include: [

          {
            model: Room,
            attributes: ['room_name', 'description', 'rating']
          }
        ]
      });
  
      if (bookings.length === 0) {
        return res.status(404).json({ message: 'No bookings found for this guest.' });
      }

  
      res.status(200).json(bookings);
    } catch (error) {
      console.error(`Error fetching bookings for guest with ID ${customer_id}:`, error);
      res.status(500).json({ message: 'Failed to fetch bookings' });
    }
  });

  
  router.delete('/bookId/:booking_id', async (req, res) => {
    const booking_id = req.params.booking_id;
  
    try {
      const booking = await Booking.findByPk(booking_id);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      await booking.destroy();
      res.status(200).json({ message: 'Booking deleted successfully' });
  
    } catch (error) {
      console.error(`Error deleting booking with ID ${booking_id}:`, error);
      res.status(500).json({ message: 'Failed to delete booking' });
    }
  });

  
  const addMonths = (date, months) => {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
  };

  router.get('/availability/:room_id', async (req, res) => {
    const room_id = req.params.room_id;
    const today = new Date();
    const twoMonthsLater = addMonths(today, 2);
  
    const startDate = today.toISOString().split('T')[0];
    const endDate = twoMonthsLater.toISOString().split('T')[0];
  
    try {
      const bookings = await Booking.findAll({
        where: {
          room_id,
          [Op.or]: [
            { check_in_date: { [Op.between]: [startDate, endDate] } },
            { check_out_date: { [Op.between]: [startDate, endDate] } },
            { 
              check_in_date: { [Op.lte]: startDate },
              check_out_date: { [Op.gte]: endDate }
            }
          ]
        }
      });
  
      res.status(200).json({
        room_id,
        bookings,
      });
    } catch (error) {
      console.error(`Error fetching availability for room with ID ${room_id}:`, error);
      res.status(500).json({ message: 'Failed to fetch availability' });
    }
  });
  
  
  module.exports = router;