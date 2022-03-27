const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const castingSchema = new Schema({
   productor: { type: String, required: true },
   director: { type: String, required: true },
   dp: { type: String, required: true },
   date: { type: String, required: true },
   title: { type: String, required: true },
   personal: {
      age: { type: String, required: true },
      generx: { type: String, required: true },
   },
   industry: { type: String, required: true },
   info: { type: String, required: false },
   status: { type: String, required: false },
});

module.exports = mongoose.model("Casting", castingSchema);
