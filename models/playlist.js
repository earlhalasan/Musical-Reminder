const mongoose = require("./connection");
const { Schema, model } = mongoose;

// make playlist schema
const playlistSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  img: String,
  genre: String,
  songs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
});

const Playlist = model("Playlist", playlistSchema);

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Playlist;
