const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
   email: { type: String, required: true },
   password: { type: String, required: true },
   castings: [
      { type: mongoose.Types.ObjectId, required: true, ref: "Castings" },
   ],
});

module.exports = mongoose.model("User", userSchema);
