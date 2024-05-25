const mongoose = require("mongoose");
const joi = require("joi");

const schema = mongoose.Schema({
  bikeType: {
    type: String,
    required: true,
  },
  vehicle: { type: String, required: true },
  booked: { type: Boolean, required: true },
});

const Bike = new mongoose.model("Bikes", schema);

function validateBike(body) {
  const schema = joi.object({
    bikeType: joi.string().required(),
    vehicle: joi.string().required(),
    booked: joi.boolean().required(),
  });
  return schema.validate(body);
}

module.exports = { Bike, validateBike };
