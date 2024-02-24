//const { isNull } = require('util');
const car_mongodb = require('../models/connect');
const Car_objectId = require('mongodb').ObjectId;

// Return all artists
const getAllArtists = async (req, res, next) => {
  
  const result = await car_mongodb.getDb().db("music").collection('artists').find();
  console.log(result.toArray.length);
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    console.log(lists);
    res.status(200).json(lists);
  });
};

// Return one artist by id
const getSingleArtist = async (req, res, next) => {
  if (!Car_objectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid contact id to update a contact");
    return;
  }

  const userId = new Car_objectId(req.params.id);
  console.log("artist single routes");
  const result = await car_mongodb.getDb().db("music").collection('artists').find({ _id: userId });
  result.toArray().then((lists) => {
    if (lists.length != 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    } 
    else {
      res.status(200).json("Artist not found.");
    } 
  });
};

// Create one artist from body json
const createArtist = async (req, res, next) => {

  // Create an artist
  const artist = {
    name: req.body.name,
    type: req.body.type
  };

  // Save Artist in the database
  const result = await car_mongodb.getDb().db("music").collection('artists').insertOne(artist);

  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'An error occurred while creating the artist.');
  }
};
  
// Update a single artist
const updateArtist = async (req, res, next) => {
  if (!Car_objectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid contact id to update a contact");
    return;
  }
  
  const userId = new Car_objectId(req.params.id);

  // Update an artist
  const artist = {
    name: req.body.name,
    type: req.body.type
  };
  
  // Update data in database
  const response = await car_mongodb.getDb().db("music").collection('artists').replaceOne({ _id: userId }, artist);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while updating the artist.');
  }
}; 

// Delete one artist
const deleteArtist = async (req, res, next) => {
  if (!Car_objectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid contact id to update a contact");
    return;
  }
  const userId = new Car_objectId(req.params.id);
  
  const response = await car_mongodb.getDb().db("music").collection('artists').deleteOne({ _id: userId }, true);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while deleting the artist.');
  }
};

module.exports = { 
  getAllArtists, 
  getSingleArtist, 
  createArtist, 
  updateArtist, 
  deleteArtist 
};

