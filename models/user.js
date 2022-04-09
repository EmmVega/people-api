const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
   email: { type: String, required: true },
   password: { type: String, required: true },
   cv: { type: String, required: false },
   castings: [
      {
         _id: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Castings",
         },
         status: { type: String, required: true },
      },
   ],
});

module.exports = mongoose.model("User", userSchema);
