const mongoose = require("./connection");
const { Schema, model } = mongoose;

// make song schema
const songSchema = new Schema({
  name: { type: String, required: true },
  artist: String,
  img: String,
  album: String,
  username: String,
});

const Song = model("Song", songSchema);

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Song;
