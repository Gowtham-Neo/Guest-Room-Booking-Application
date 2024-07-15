  const express = require('express');
  const router = express.Router();
  const multer = require('multer');
  const { House,Room } = require('../models');

  // Configure multer for file uploads
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/house/'); // Destination folder for storing uploads
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original filename for storage
    }
  });

  const upload = multer({ storage: storage });

  // POST /api/houses/register - Create a new house with photos
  router.post('/register', upload.array('photos', 10), async (req, res) => {
    const { owner_id, house_name, address, description, rating } = req.body;
    console.log('Request params:', req.params); // Log request parameters for debugging
    console.log('Request body:', req.body); // Log request body for debugging
    console.log('Files:', req.files); 
    try {
      const photos = req.files || [];
      const photoUrls = photos.map(file => `/uploads/house/${file.filename}`);
      
      const newHouse = await House.create({
        house_name,
        address,
        description,
        rating,
        owner_id,
        photos: photoUrls  // Save photo URLs to the database
      });
  
      res.status(201).json({
        message: 'House registration successful',
        house: {
          id: newHouse.id,
          house_name: newHouse.house_name,
          address: newHouse.address,
          owner_id: newHouse.owner_id,
          photos: newHouse.photos // Return saved photo URLs in the response
        },
      });
    } catch (error) {
      console.error('Error registering house:', error);
      res.status(500).json({ message: 'Failed to register house', error: error.message });
    }
  });
  
  // GET /api/houses - Get all houses
  router.get('/', async (req, res) => {
    try {
      const houses = await House.findAll();
      res.status(200).json(houses);
    } catch (error) {
      console.error('Error fetching houses:', error);
      res.status(500).json({ message: 'Failed to fetch houses', error: error.message });
    }
  });

  router.get('/houseview/:house_id', async (req, res) => {
    const { house_id } = req.params;
  
    console.log(`Fetching details for house ID: ${house_id}`); // Log the incoming request
  
    try {
      const house = await House.findByPk(house_id);
      if (!house) {
        console.log(`House with ID ${house_id} not found`); // Log if the house is not found
        return res.status(404).json({ error: 'House not found' });
      }
      console.log(`House found: ${JSON.stringify(house)}`); // Log the found house
  
      const rooms = await Room.findAll({ where: { house_id } });
      console.log(`Rooms found: ${JSON.stringify(rooms)}`); // Log the found rooms
  
      res.json({ house, rooms });
    } catch (error) {
      console.error('Error fetching house details:', error);
      res.status(500).json({ error: 'An error occurred while fetching house details' });
    }
  });

  // GET /api/houses/:house_id - Get a specific house by ID
  // router.get('/:house_id', async (req, res) => {
  //   const owner_id = req.user.id;
  //   console.log(owner_id)
  //   const house_id = req.params.house_id;

  //   try {
  //     const house = await House.findByPk(house_id, {
  //       include: {
  //         model: Room,
  //         as: 'rooms'
  //       }
  //     });
  //     if (!house) {
  //       return res.status(404).json({ message: 'House not found' });
  //     }
  //     res.status(200).json(house);
  //   } catch (error) {
  //     console.error(`Error fetching house with ID ${house_id}:`, error);
  //     res.status(500).json({ message: 'Failed to fetch house' });
  //   }
  // });

  router.get('/:owner_id', async (req, res) => {
    const owner_id = req.params.owner_id;

    try {
      const houses = await House.findAll({
        where: { owner_id },
        include: {
          model: Room,
          as: 'rooms'
        }
      });
      console.log(houses)
      
      res.status(200).json(houses);
    } catch (error) {
      console.error(`Error fetching houses for owner with ID ${owner_id}:`, error);
      res.status(500).json({ message: 'Failed to fetch houses' });
    }
  });

  // PUT /api/houses/:house_id - Update a specific house by ID
  router.put('/:house_id', upload.array('photos', 10), async (req, res) => {
    const house_id = req.params.house_id;
    const { house_name, address,description,rating } = req.body;

    try {
      let house = await House.findOne({where:{id:house_id}});
      if (!house) {
        return res.status(404).json({ message: 'House not found' });
      }

      // Update house data
      house.house_name = house_name;
      house.address = address;
      house.description = description;
      house.rating = rating;

      // Handle photo uploads if any
      
      const photos = req.files || [];
      const photoUrls = photos.map(file => `/uploads/house/${file.filename}`);
      house.photos = photoUrls.length > 0 ? photoUrls : house.photos;
      

      await house.save();
      console.log(house)
      res.status(200).json({
        message: 'House updated successfully',
        house: {
          house_id: house.id,
          house_name: house.house_name,
          address: house.address,
          owner_id: house.owner_id,
          photos: house.photos
        },
      });

    } catch (error) {
      console.error(`Error updating house with ID ${house_id}:`, error);
      res.status(500).json({ message: 'Failed to update house', error: error.message });
    }
  });

  // DELETE /api/houses/:house_id - Delete a specific house by ID
  router.delete('/:house_id', async (req, res) => {
      const house_id = req.params.house_id;
    
      try {
        const house = await House.findByPk(house_id);
        if (!house) {
          return res.status(404).json({ message: 'House not found' });
        }
    
        await house.destroy();
        res.status(200).json({ message: 'House deleted successfully' });
    
      } catch (error) {
        console.error(`Error deleting house with ID ${house_id}:`, error);
        res.status(500).json({ message: 'Failed to delete house' });
      }
  });
    
  //use this for customer

  router.get('/', async (req, res) => {
    try {
      const houses = await House.findAll();
      res.status(200).json(houses);
    } catch (error) {
      console.error('Error fetching houses:', error);
      res.status(500).json({ message: 'Failed to fetch houses' });
    }
  });

  module.exports = router;
