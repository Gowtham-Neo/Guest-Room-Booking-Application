const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Room,Booking} = require('../models');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/room/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/house/:house_id/room', upload.array('photos', 10), async (req, res) => {
  const house_id = req.params.house_id;
  console.log('Request params:', req.params); // Log request parameters for debugging
  console.log('Request body:', req.body); // Log request body for debugging
  console.log('Files:', req.files); // Log uploaded files for debugging

  const { room_name, floor_size, beds_count, amenities, min_stay, max_stay, rent_amount, description, max_guest, rating, owner_id } = req.body;

  try {
    const photos = req.files || [];
    const photoUrls = photos.map(file => `/uploads/room/${file.filename}`);

    const newRoom = await Room.create({
      house_id,
      owner_id,
      room_name,
      floor_size,
      max_guest,
      beds_count,
      amenities: amenities.split(','), // Convert amenities to array
      min_stay,
      max_stay,
      rent_amount,
      description,
      rating,
      photos: photoUrls
    });

    res.status(201).json({
      message: 'Room registration successful',
      room: newRoom,
    });
  } catch (error) {
    console.error('Error registering room:', error); // Log error for debugging
    res.status(500).json({
      message: 'Error registering room',
      error: error.message,
    });
  }
});


// GET /api/houses/:house_id/rooms - Get all rooms for a specific house
router.get('/house/:house_id/rooms', async (req, res) => {
    const house_id = req.params.house_id;
    try {
        const rooms = await Room.findAll({ where: { house_id } });
        res.status(200).json(rooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ message: 'Failed to fetch rooms' });
    }
});
router.get('/rooms', async (req, res) => {
    try {
        const rooms = await Room.findAll();
        res.status(200).json(rooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ message: 'Failed to fetch rooms' });
    }
});


router.get('/room/:room_id', async (req, res) => {
  const { room_id } = req.params;

  console.log(`Fetching details for room ID: ${room_id}`);

  try {
    const room = await Room.findByPk(room_id, {
      include: [Booking]
    });
    if (!room) {
      console.log(`Room with ID ${room_id} not found`);
      return res.status(404).json({ error: 'Room not found' });
    }
    console.log(`Room found: ${JSON.stringify(room)}`);
    res.json(room);
  } catch (error) {
    console.error('Error fetching room details:', error);
    res.status(500).json({ error: 'An error occurred while fetching room details' });
  }
});


// GET /api/houses/:house_id/rooms/:room_id - Get a specific room by ID for a specific house
router.get('/house/:house_id/room/:room_id', async (req, res) => {
    const { house_id, room_id } = req.params;

    try {
        const room = await Room.findOne({ where: { id: room_id, house_id } });
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json(room);
    } catch (error) {
        console.error(`Error fetching room with ID ${room_id}:`, error);
        res.status(500).json({ message: 'Failed to fetch room' });
    }
});

// PUT /api/houses/:house_id/rooms/:room_id - Update a specific room by ID for a specific house
router.put('/house/:house_id/room/:room_id', upload.array('photos', 10), async (req, res) => {
  const house_id = req.params.house_id;
  const room_id = req.params.room_id;

  const { room_name, floor_size, beds_count, amenities, min_stay, max_stay, rent_amount, description, max_guest, rating, owner_id } = req.body;

  try {
    const photos = req.files || [];
    const photoUrls = photos.map(file => `/uploads/room/${file.filename}`);

    const room = await Room.findOne({ where: { id: room_id, house_id } });

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    room.room_name = room_name;
    room.floor_size = floor_size;
    room.beds_count = beds_count;
    room.amenities = amenities.split(',');
    room.min_stay = min_stay;
    room.max_stay = max_stay;
    room.rent_amount = rent_amount;
    room.description = description;
    room.max_guest = max_guest;
    room.rating = rating;
    room.photos = photoUrls.length > 0 ? photoUrls : room.photos;
    room.owner_id = owner_id;

    await room.save();

    res.json({ message: 'Room updated successfully', room });
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ message: 'Error updating room', error });
  }
});

// DELETE /api/houses/:house_id/rooms/:room_id - Delete a specific room by ID for a specific house
router.delete('/house/:house_id/room/:room_id', async (req, res) => {
    const { house_id, room_id } = req.params;

    try {
        const room = await Room.findOne({ where: { id: room_id, house_id } });
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        await room.destroy();
        res.status(200).json({ message: 'Room deleted successfully' });

    } catch (error) {
        console.error(`Error deleting room with ID ${room_id}:`, error);
        res.status(500).json({ message: 'Failed to delete room' });
    }
});



router.delete('/House/:house_id/room/:room_id/photo', async (req, res) => {
  const { house_id, room_id } = req.params;
  const { filename } = req.body; // The filename of the photo to delete

  try {
    let room = await Room.findOne({ where: { id: room_id, house_id } });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Remove the specified photo from the photos array
    room.photos = room.photos.filter(photo => !photo.includes(filename));

    // Save the updated room data
    await room.save();

    res.status(200).json({
      message: 'Photo deleted successfully',
      room: room,
    });

  } catch (error) {
    console.error(`Error deleting photo from room with ID ${room_id}:`, error);
    res.status(500).json({ message: 'Failed to delete photo' });
  }
});



module.exports = router;
