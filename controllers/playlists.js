const express = require("express");
const Playlist = require("../models/playlist.js");
const Song = require("../models/song.js");
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

// Index Route
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

// Create Route
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

// New Route
router.get("/new", (req, res) => {
  res.render("playlists/new.liquid");
});

// Show Route
router.get("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // find the particular playlist from the database
  Playlist.findById(id)
    .populate("songs")
    .exec(function (err, playlists) {
      Song.find(
        {
          _id: { $nin: playlists.songs },
        },
        function (err, songs) {
          console.log(songs);
          res.render("playlists/show.liquid", {
            title: "song detail",
            playlists,
            songs,
          });
        }
      );
    });
  // .then((playlists) => {
  //   console.log(playlists, "testing");
  //   // render the template with the data from the database
  //   res.render("playlists/show.liquid", { playlists });
  // })
  // .catch((error) => {
  //   console.log(error);
  //   res.json({ error });
  // });
});

// Update Route (after edit)
router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  Playlist.findByIdAndUpdate(id, req.body, { new: true })
    .then((playlist) => {
      // redirect to main page after updating
      res.redirect(`/playlists/${playlist.id}`);
    })
    // send error as json
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

// Add Song to Playlist
router.post("/:id/songs", (req, res) => {
  Playlist.findById(req.params.id, function (error, playlist) {
    playlist.songs.push(req.body.songId);
    playlist.save(function (error, playlist) {
      res.redirect(`/playlists/${playlist.id}`);
    });
  });
});

// Remove Song from Playlist
router.delete("/:id/songs/:songId", (req, res) => {
  Playlist.findById(req.params.id, function (error, playlist) {
    playlist.songs.splice(playlist.songs.indexOf(req.params.songId), 1);
    // console.log("song to be deleted");
    // console.log(req.params.songId);
    playlist.save(function (error, playlist) {
      res.redirect(`/playlists/${playlist.id}`);
    });
  });
});

// Edit Route
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
