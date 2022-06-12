const express = require("express");
const Playlist = require("../models/playlist.js");
const mongoose = require("mongoose");
const db = mongoose.connection;

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
router.use((req, res, next) => {
  next();
});

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// index route
router.get("/", (req, res) => {
  // find all the playlists
  Playlist.find({})
    // render a template after they are found
    .then((playlists) => {
      res.render("playlists/index.liquid", {
        playlists,
      });
    })
    // send error as json if they aren't
    .catch((error) => {
      res.json({
        error,
      });
    });
});

// create route
router.post("/", (req, res) => {
  // create the new playlist
  Playlist.create(req.body)
    .then((playlist) => {
      // redirect user to index page if successfully created item
      res.redirect("/playlists");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// New route
router.get("/new", (req, res) => {
  res.render("playlists/new.liquid");
});

// show route
router.get("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // find the particular playlist from the database
  Playlist.findById(id)
    .then((playlists) => {
      // render the template with the data from the database
      res.render("playlists/show.liquid", { playlists });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

//update route
router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  Playlist.findByIdAndUpdate(id, req.body, { new: true })
    .then((playlist) => {
      // redirect to main page after updating
      res.redirect("/playlists");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// delete route
router.delete("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the playlist
  Playlist.findByIdAndRemove(id)
    .then((playlist) => {
      // redirect to main page after deleting
      res.redirect("/playlists");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// edit route
router.get("/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the playlist from the database
  Playlist.findById(id)
    .then((playlist) => {
      // render edit page and send playlist data
      res.render("playlists/edit.liquid", { playlist });
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////

module.exports = router;
