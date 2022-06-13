///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require("./connection");
const Playlist = require("./playlist");

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

// save the connection in a variable
const db = mongoose.connection;

// Make sure code is not run till connected
db.on("open", () => {
  ///////////////////////////////////////////////
  // Write your Seed Code Below
  //////////////////////////////////////////////

  // Run any database queries in this function
  const startPlaylists = [
    {
      name: "Sunset Dreams",
      description: "Ride off into the sunset.",
      img: "https://thumbs.dreamstime.com/b/sun-neon-retro-s-background-vector-sunset-futuristic-space-146377160.jpg",
      genre: "Indie/Pop",
    },
    {
      name: "Night Rider",
      description: "Windows down. Music up.",
      img: "https://i1.sndcdn.com/artworks-000137291030-qp244i-t500x500.jpg",
      genre: "Hip-Hop/House",
    },
    {
      name: "Sleep Drifter",
      description: "Sleepy time.",
      img: "https://libraryitems.insighttimer.com/w3s6e9s5x2v4m6p4v3d0s4u7z1w4g1x0f2c5b2e2/pictures/tiny_square_medium.jpeg",
      genre: "Ambient",
    },
  ];

  // Delete all playlsits
  Playlist.deleteMany({})
    .then((deletedPlaylists) => {
      // add the starter playlists
      Playlist.create(startPlaylists)
        .then((newPlaylists) => {
          // log the new playlists to confirm their creation
          console.log(newPlaylists);
          db.close();
        })
        .catch((error) => {
          console.log(error);
          db.close();
        });
    })
    .catch((error) => {
      console.log(error);
      db.close();
    });

  ///////////////////////////////////////////////
  // Write your Seed Code Above
  //////////////////////////////////////////////
});
