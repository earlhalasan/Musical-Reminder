const express = require("express");
const Song = require("../models/song.js");
const Playlist = require("../models/playlist.js");
const mongoose = require("mongoose");

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

// Index Route
router.get("/", (req, res) => {
  // find all the playlists
  Song.find({})
    // render a template after they are found
    .then((songs) => {
      res.render("songs/index.liquid", {
        songs,
      });
    })
    // send error as json if they aren't
    .catch((error) => {
      res.json({
        error,
      });
    });
});

// Create Route
router.post("/", (req, res) => {
  // create the new song
  const id = req.params.id;
  Song.create(req.body)
    .then((song) => {
      console.log(song);
      Playlist.findById(id);
      Playlist.songs.push(req.body.songId);
      //   console.log(Playlist.songs);
      // redirect user to index page if successfully created item
      res.redirect("/songs");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// New Route
router.get("/new", (req, res) => {
  res.render("songs/new.liquid");
});

// Show Route
router.get("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // find the particular playlist from the database
  Song.findById(id)
    .then((songs) => {
      // render the template with the data from the database
      res.render("songs/show.liquid", { songs });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// Delete Route
router.delete("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the playlist
  Song.findByIdAndRemove(id)
    .then((song) => {
      // redirect to main page after deleting
      res.redirect("/songs");
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
